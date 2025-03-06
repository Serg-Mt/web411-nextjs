import { useState } from 'react'

export function LikeButton({ big, start = 0, step = 1, color, bordered }) {
  const
    [likes, setLikes] = useState(+start),
    [border, setBorder] = useState(bordered),
    className = 'like ' + (big ? 'big' : '') + ' ' + (border ? 'border' : '');
  return <>
    <button
      className={className}
      onClick={() => setLikes(prev => +step + prev)}
      onContextMenu={event => { event.preventDefault(); setBorder(prev => !prev) }}
      style={{ color }}>
      Like: {likes}
    </button>
  </>
}

export function Parent() {
  const
    // [a, setA] = useState('111'),
    [b, setB] = useState('999');
  return <fieldset>
    <legend>Parent</legend>
    <Child val={b} callBack={setB} />
    <Child val={b} callBack={setB} />
  </fieldset>
}

function Child({ val, callBack }) {
  // const
    // [value, setValue] = useState(val);
  return <fieldset>
    <legend>Child</legend>
    <input value={val} onInput={event => callBack(event.target.value)} />

  </fieldset>
}