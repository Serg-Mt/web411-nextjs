import { useState, memo, useCallback, useRef } from 'react';

class ToDoItem {
  id = Math.random();
  completed = false;
  text = 'default';
  constructor(text) {
    this.text = text;
  }
  clone() {
    const
      result = new ToDoItem;
    Object.assign(result, this);
    return result;
  }
  toggle() {
    this.completed = !this.completed;
    return this.clone();
  }
}
const Button = memo(function ({ children, onClick }) {
  console.debug('Button', children);
  return <button onClick={onClick}>{children}</button>;
});

const Item = memo(
  /**
   * 
   * @param {object} props 
   * @param {ToDoItem} props.item
   * @returns {JSX.Element}
   */
  function ({ item, delItem, toggleItem }) {
    console.debug('Item', item);
    const
      { id, text, completed } = item,
      onClick = useCallback(() => delItem(id), [id]);

    return <li>
      <input type="checkbox" checked={completed} onChange={() => toggleItem(id)} />
      {completed && '✔'}
      {text}
      <Button onClick={onClick}>✖</Button>
    </li>
  }
);

const Form = memo(
  function ({ addItem }) {
    const
      ref = useRef(null),
      // [value, setValue] = useState('=default='),
      onClick = useCallback(() => { addItem(ref.current.value); ref.current.value = '' }, []);
    console.debug('Form', { ref });
    return <>
      <input ref={ref} />
      <Button onClick={onClick}>➕</Button >
    </>
  }
);

export function ToDoList() {
  const
    [list, setList] = useState([
      new ToDoItem('купить молока'),
      new ToDoItem('покормить кошку')]),
    addItem = useCallback(text => setList(
      prev => prev.concat(new ToDoItem(text))), []),
    delCompleted = useCallback(() => setList(
      prev => prev.filter(elem => !elem.completed)), []),
    toggleItem = useCallback(id => setList(prev => {
      // console.log('toggleItem', { prev })
      const
        index = prev.findIndex(elem => id === elem.id),
        elem = prev[index].toggle();
      // elem.toggle();
      // console.log('toggleItem', { id, prev, index })
      return prev.with(index, elem);
    }), []),
    delItem = useCallback(id => setList(
      prev => prev.filter(elem => id !== elem.id)), []);
  return <>
    <h3>ToDo List</h3>
    <Form addItem={addItem} />
    <Button onClick={delCompleted}>del all completed</Button>
    <List list={list} delItem={delItem} toggleItem={toggleItem} />
  </>;
}


function List({ list, delItem, toggleItem }) {
  console.debug('List');
  return <ol>
    {list.map(item =>
      <Item key={item.id} item={item} delItem={delItem} toggleItem={toggleItem} />)}
  </ol>
}
