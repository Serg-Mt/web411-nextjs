import { Component, memo, PureComponent, useEffect, useState } from 'react';

class ChildCC extends PureComponent {
  constructor(props) {
    console.debug('constructor');
    super(props);
    this.state = { childState: 11 }
  }

  render() {
    console.debug('render');
    return <fieldset>
      <legend>Child</legend>
      child props = {this.props.childProps}<br />
      child state = {this.state.childState}
      <button onClick={() => this.setState(prev => ({ childState: prev.childState + 1 }))}>+</button>
      <br />
    </fieldset>
  }
  componentDidMount() { console.debug('DidMount'); }
  componentDidUpdate() { console.debug('DidUpdate'); }
  componentWillUnmount() { console.debug('WillUnmount'); }
}

const 
  ChildFC = memo(function ({ childProps }) {
  console.debug('render');
  const
    [childState, setChildState] = useState(0);
  useEffect(() => console.debug('mount + every rerender'));
  useEffect(() => console.debug('mount'), []);
  useEffect(() => console.debug('mount + childProps'), [childProps]);
  useEffect(() => console.debug('mount + childState'), [childState]);
  useEffect(() => () => console.debug('unmount'), []);

  return <fieldset>
    <legend>Child (FC)</legend>
    child props = {childProps}<br />
    child state = {childState}
    <button onClick={() => setChildState(prev => prev + 1)}>+</button>
  </fieldset>
});

export function Parent() {
  const
    [value, setValue] = useState('-start-'),
    [show, setShow] = useState(false),
    [num, setNum] = useState(0);
  return <fieldset>
    <legend>Parent</legend>
    <input value={value} onInput={event => setValue(event.target.value)} /> = {value}
    <hr />
    <input value={num} onInput={event => setNum(event.target.value)} type="number" s />
    <button onClick={() => setShow(prev => !prev)}>{show ? 'hide' : 'show'}</button>
    {show && <ChildFC childProps={num} />}
  </fieldset>
}

