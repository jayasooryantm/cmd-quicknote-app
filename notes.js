const fs = require('fs')
const chalk = require('chalk')
const { title } = require('process')

//get the notes from storage
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse.bold('Your Notes: '))
    notes.forEach(note => {
        console.log(chalk.blue(note.title))
    })
}

//add notes to the storage
const addNote = (title, body) => {
    //loading the notes
    const notes = loadNotes()
    //filtering the notes
    const duplicateNote = notes.find((note) => note.title === title)
    //adding note to note array
    if(duplicateNote === undefined){
        notes.push({
            title: title,
            body: body
        })
        //saving the notes
        saveNote(notes)
        console.log(chalk.green('Note saved!'))
    }
    else{
        console.log(chalk.red('Title taken!'))
    }
}

//note saving function
const saveNote = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

//note loading function from storage
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        return JSON.parse(dataBuffer.toString())
    }
    catch(e){
        return []
    }
    
}

//note removing function from storage

const removeNote = (title) => {
    const notes = loadNotes()

    const newNotes = notes.filter((note) => note.title !== title)

    if(notes.length > newNotes.length)
    {
        saveNote(newNotes)
        console.log(chalk.green(title, 'note removed!'))
    }
    else{
        console.log(chalk.red('Nothing to remove!!'))
    }
    
}

const readNote = (title) => {
    const notes = loadNotes()

    const noteToRead = notes.find((note) => note.title === title)
    if(noteToRead !== undefined){
        console.log(chalk.inverse(noteToRead.title))
        console.log((noteToRead.body))
    }
    else{
        console.log(chalk.red('Note not found'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
