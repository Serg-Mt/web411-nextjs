import { useState } from 'react';

class ToDoItem {
  id = Math.random();
  completed = false;
  text = 'default';
  constructor(text) {
    this.text = text;
  }
  toggle() {
    this.completed = !this.completed;
    return this;
  }
}

export function ToDoList() {
  const
    [list, setList] = useState([
      new ToDoItem('купить молока'),
      new ToDoItem('покормить кошку')]),
    addItem = text => setList(prev => prev.concat(new ToDoItem(text))),
    delCompleted = () => setList(prev => prev.filter(elem => !elem.completed)),
    toggleItem = id => setList(prev => {
      console.log('toggleItem', { prev })
      const
        index = prev.findIndex(elem => id === elem.id),
        elem = prev[index];
      elem.toggle();
      // console.log('toggleItem', { id, prev, index })
      return prev.with(index, elem);
    }),

    delItem = id => setList(prev => prev.filter(elem => id !== elem.id));
  return <>
    <h3>ToDo List</h3>
    <Form addItem={addItem} />
    <Button onClick={delCompleted}>del all completed</Button>
    <List list={list} delItem={delItem} toggleItem={toggleItem} />
  </>;
}



function List({ list, delItem, toggleItem }) {
  return <ol>
    {list.map(item =>
      <Item key={item.id} item={item} delItem={delItem} toggleItem={toggleItem} />)}
  </ol>
}

function Form({ addItem }) {
  const
    [value, setValue] = useState('');
  return <>
    <input value={value} onInput={event => setValue(event.target.value)} />
    <Button onClick={() => { addItem(value); setValue('') }}>➕</Button>
  </>
}

/**
 * 
 * @param {object} props 
 * @param {ToDoItem} props.item
 * @returns {JSX.Element}
 */
function Item({ item, delItem, toggleItem }) {
  const
    { id, text, completed } = item;

  return <li>
    <input type="checkbox" value={completed} onChange={() => toggleItem(id)} />
    {completed && '✔'}
    {text}
    <Button onClick={() => delItem(id)}>✖</Button>
  </li>
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}