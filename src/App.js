import React from 'react';
import customData from './nested.json';
import './App.css';

function App() {
  var data = customData;

  return (
    <div className="App">
      <Grid data={data}/>
    </div>
  );
}

function Grid(props){

  var data = props.data
  var children = props.data.children;

  var gridStyle={
    gridTemplateColumns: `repeat(${data.gridSize.width},1fr)`,
    gridTemplateRows: `repeat(${data.gridSize.height},1fr)`,
    backgroundColor: data.backgroundColor,
  };

  if(data.size){
    gridStyle={
      ...gridStyle,
      gridColumnStart: data.position.x + 1,
      gridColumnEnd: data.position.x + data.size.width + 1,
      gridRowStart: data.position.y + 1,
      gridRowEnd: data.position.y + data.size.height + 1
    }
  }

  return(
      <div className="grid" style={gridStyle}>
        {children?
          children.map(function(child){
            if(child.type === "grid"){
              return <Grid data={child}/>
            } else{
              return <Block data={child}/>
            }
          }) : null
        }
      </div>
  )

}

function Block(props){
  const data=props.data;
  const blockStyle={
    backgroundColor: data.color,
    gridColumnStart: data.position.x + 1,
    gridColumnEnd: data.position.x + data.size.width + 1,
    gridRowStart: data.position.y + 1,
    gridRowEnd: data.position.y + data.size.height + 1
  }
  return(
    <div style={blockStyle}></div>
  )
}

export default App;
