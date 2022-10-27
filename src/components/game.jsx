import React from 'react'
import { useEffect, useState } from 'react';
import './game.css'

export default function Game() {
  
  const [ques, setQues] = useState({});
  const [val, setVal] = useState("");
  const [text, setText] = useState("");
  
  const fetchQuestion = async() =>{
    const fetchedQuestion = await fetch('https://opentdb.com/api.php?amount=1');
    const question = await fetchedQuestion.json();
    // console.log(question.results[0]);
    setQues(question.results[0]);
  }
  useEffect(() =>{
    
    fetchQuestion();
  },[])

  const handleChange = (e) =>{
    setText(e.target.value);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(text === ques.correct_answer){
      setVal("Correct");
    }else{
      setVal("Incorrect");
    }
  }

  const getNextQuestion = (e) =>{
    fetchQuestion();
    setVal("");
    // e.target.value="";
    setText("");
  }
  return (
    <div className='mainContainer'>
      <h1>Q. {ques.question}</h1>
      <input type="text" onChange={handleChange} value={text} className="textField"></input>
      <span style={{color: (val === 'Incorrect') ? 'red': 'green'}}>{val}</span>
      <div style={{display: 'flex'}}>

        <button type="submit" onClick={handleSubmit} className="submitButton">Submit</button>
        <button type="submit" onClick={getNextQuestion} className="nextButton">Next</button>
      </div>
    </div>
  )
}
