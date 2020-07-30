import React, { Component } from 'react'
class Board extends Component {
constructor(props){
    super(props)
    this.state={
        squares:Array(9).fill(null),
        XisNext:true,
        moves:[],
        gameisover:false
        
    };
    this.reset_game=this.reset_game.bind(this)

}//checks if null value is still in state.squares
gameover=(copy)=>{
   let over=true;
    for (let x of copy){
        if (!x){
            over=false;
    } }
        return over 
}
//changes game when any square in the game is pressed
handler(i,props){
    const copy=this.state.squares.slice();
    if(calculateWinner(copy)[0]||copy[i]){

        return;
    }
    
    copy[i]=this.state.XisNext?'X':'O';
    
    this.state.moves.push(i)

    this.setState(state=>({
        XisNext:!state.XisNext,
        squares:copy,
    }));
}
//resets the state.aquares
reset_game=(winning_combo,glow)=>{
    this.setState({
        squares:Array(9).fill(null),
        XisNext:!this.state.XisNext,//winner starts next game

    })
    if(winning_combo){
    this.del_combo(winning_combo,glow)
}}
//removes text glow effect
del_combo(winning_combo,glow){ 
    for(let i of winning_combo){
        let id=i.toString()
let block=document.getElementById(id);

block.classList.remove(glow);

    }
}
//text glow effect to the winning triplet squares
combo(winning_combo,glow){ 
    for(let i of winning_combo){
        let id=i.toString();
let wsq=document.getElementById(id);
wsq.classList.add(glow);


    }
}  
//resets the last pressed square from the board and also removes text glow effect 
undo(winning_combo,glow){
    if (winning_combo){
    this.del_combo(winning_combo,glow)
    }
    
    const copy=this.state.squares.slice()
    if (this.state.moves.length>0){
        let last_item=this.state.moves[this.state.moves.length-1]
    copy[last_item]=null;

    this.setState(state=>({
        squares:copy,
        XisNext:!state.XisNext,
        moves:state.moves.slice(0,[state.moves.length-1])
        
    }));
    console.log(this.state.XisNext,this.state.moves)}
    else{
        return
    }

}//creates squares by calling this function with diiferent i 
      rendersquare(i){
           return <Square onClick={()=>this.handler(i)} id={i} value={this.state.squares[i]} />
            }
            render(){       
                let status;
                let glow;
                const [winner,winning_combo]=calculateWinner(this.state.squares);
            
              
             
                if(winner){
                    
                    status= winner+' wins';   
                    glow='winner'
                    this.combo(winning_combo,glow)
                    
                

                }
                else if (this.gameover(this.state.squares) & !winner){
                    status='Its a draw'
                    
                }
                   
                else{
                 status='Its '+(this.state.XisNext?'X':'O')+'\'s turn' ;
                }
                    return (<div className='container'>
                     <h1 className='next'>{status}</h1>   
                <div className='board'>            
                  <div > {this.rendersquare(0)}
                        {this.rendersquare(1)}
                    {this.rendersquare(2)}  </div>
                    <div  > {this.rendersquare(3)}
                  
                 {this.rendersquare(4)}
                    {this.rendersquare(5)}</div>
                    <div>   {this.rendersquare(6)}
                   {this.rendersquare(7)}
                    {this.rendersquare(8)}
                   </div>
                   </div>
                   <button className='new-game' onClick={()=>this.reset_game(winning_combo,glow)}><h3>new game</h3></button>
                   <button className='new-game' onClick={()=>this.undo(winning_combo,glow)}><h3>Undo</h3></button>


                    </div>);
         
}
            }
//one button
 function Square(props){
        return (<button className='button' id={(props.id).toString()} onClick={props.onClick}><h2>{props.value}</h2></button>)
        

}
//calculates winner by matching  three consecutive x's or o's with all the possible ways you can win,good thing tictactoe is small 
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a],[a,b,c]];
      
    }
    }
    return [null];
  }


export default Board
