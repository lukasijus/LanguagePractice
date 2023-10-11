import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

function Practice() {
    const [phrase, setPhrase] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showFinnish, setShowFinnish] = useState(Math.random() > 0.5);
    const inputRef = useRef(null);




        
    useEffect(() => {
        fetchRandomPhrase();
    }, []);

    const fetchRandomPhrase = async () => {
        try {
            const response = await axios.get('http://localhost:3002/getRandomPhrase');
            setPhrase(response.data);
            console.log("Fetched New Phrase:", response.data);  // Log the new phrase after fetching
            setShowAnswer(false); // Hide answer for the new phrase
            setInputValue(''); // Reset the input value
            setShowFinnish(Math.random() > 0.5); // Randomly choose which language to show
        } catch (error) {
            console.error("Error fetching phrase:", error);
        }
    };
    const handleCheck = () => {
        const presentedPhrase = showAnswer ? phrase.english : phrase.finnish;
        const correctAnswer = showFinnish ? phrase.english : phrase.finnish;
        
        console.log('Current Phrase Presented:', presentedPhrase);  // Correctly log the phrase that's shown on UI
        console.log('Correct Answer:', correctAnswer);
    
        if (showAnswer) {
            fetchRandomPhrase();
            if (inputRef.current) {
                inputRef.current.focus(); // This sets the focus to the input
            }
        } else {
            setIsCorrect(inputValue.trim().toLowerCase() === correctAnswer.trim().toLowerCase());
            setShowAnswer(true);
        }
    };

    
    const handleInputChange = (e) => {
  
        setInputValue(e.target.value);
        const correctAnswer = showFinnish ? phrase.english : phrase.finnish;
        // console.log('Input Value:', e.target.value,"phrase", showFinnish ? phrase.finnish : phrase.english, "correct answer", correctAnswer );
        setIsCorrect(e.target.value.trim().toLowerCase() === correctAnswer.trim().toLowerCase());
    };
    
    
    
    

    if (!phrase) return <div>Loading...</div>;

    return (
        <div>
            <h3>{showFinnish ? phrase.finnish : phrase.english}</h3>
            <TextField 
                label="Translation" 
                variant="outlined" 
                fullWidth 
                value={inputValue} 
                onChange={handleInputChange} 
                autoComplete="off"
                inputRef={inputRef}
            />
            {showAnswer && (
                <Box color={isCorrect ? 'lightgreen' : 'lightcoral'}>
                    Correct answer: {!showFinnish ? phrase.finnish : phrase.english}
                </Box>
            )}

            <Button onClick={handleCheck}>
                {showAnswer ? "Next" : "Check"}
            </Button>
        </div>
    );
}

export default Practice;
