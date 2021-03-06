import React, { Component } from 'react'
import Note from './Note';
import { Input } from 'reactstrap';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import fetchNotes from '../queries/fetchNotes';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    borderRadius: `4px`,

    // change background colour if dragging
    background: isDragging ? "#636e72" : "transparent",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "#D3D2D3" : "#F2F1F2",
    padding: grid,
    width: `60%`,
    margin: `1rem auto`,
    borderRadius: `4px`
});

class Notes extends Component {
    constructor(props){
        super(props);
        this.state = {
            shownNotes: [],
            done: false
        }
    }

    componentDidMount = () => {
        if(!this.props.data.loading && this.props.data.notes){
            this.initializeData();
        };

    }

    componentDidUpdate(prevProps) {
        if(prevProps.data.loading && !this.props.data.loading){
            this.initializeData();
        }
        if (prevProps.data.notes && prevProps.data.notes.length !== this.props.data.notes.length){
            this.initializeData();
        }
    }

    searchInput = (event) => {
        let searchTerm = event.target.value;
        this.setState(() => {
            return ({ shownNotes: this.props.data.notes.filter(note => note.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)})
        });
    }

    initializeData = () => {
        this.setState({
            shownNotes: this.props.data.notes,
            done: true
        })
    }

    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const shownNotes = reorder(
            this.state.shownNotes,
            result.source.index,
            result.destination.index
        );

        this.setState({
            shownNotes
        });
    }

    render() {
        if (!this.state.done){
            return (<div></div>)
        }
        return (
            <div className="home">
                <Input type="text" onChange={this.searchInput} placeholder="Search" className="search-bar"/>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable" className="note-container">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {this.state.shownNotes.map((note, index) => (
                                    <Draggable key={note.id} draggableId={note.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <Link to={`/notes/${note.id}`}>
                                                    <Note id={note.id} title={note.title} content={note.content} tags={note.tags} /> 
                                                </Link>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {/* {this.state.shownNotes.map(note => {
                    return (
                        <div className="note" key={note._id}>
                            <Note id={note._id} title={note.title} content={note.textBody} tags={note.tags} /> 
                        </div>
                    )
                })} */}
            </div>
        )
    }
}

export default graphql(fetchNotes)(Notes);