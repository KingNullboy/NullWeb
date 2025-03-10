var word1 = document.getElementById("word1");
var word2 = document.getElementById("word2");
var word3 = document.getElementById("word3");
var word4 = document.getElementById("word4");
var word5 = document.getElementById("word5");
var word6 = document.getElementById("word6");
var word7 = document.getElementById("word7");
var word8 = document.getElementById("word8");
var word9 = document.getElementById("word9");
var word10 = document.getElementById("word10");
var word11 = document.getElementById("word11");
var word12 = document.getElementById("word12");

// Array of stories
const stories = {
    num1: {
        story: `Once upon a time in a faraway ${word1}, there was a ${word2} who loved to ${word3}. Every ${word4}, they would gather with their friends, a ${word5} and a ${word6}, to ${word7} by the ${word8}. But one day, the ${word9} changed everything, and they found themselves facing a wild ${word10}. In the end, they had to ${word11} in order to escape the ${word12}, but they felt ${word13} after their daring adventure.`,
        placeholders: [
            "place", "adjective", "verb", "time of day", "animal", "adjective", "verb", "noun", "emotion", "animal", "verb", "noun", "emotion"
        ]
    },
    num2: {
        story: `On a ${word1} morning, a ${word2} woke up to find that the ${word3} was gone. They quickly grabbed their ${word4} and called their ${word5} to help search. As they ${word6} across the ${word7}, they encountered a ${word8} who offered them a ${word9}. It was only when they reached the ${word10} that they realized they had to ${word11} to solve the mystery. By the end of the day, they felt ${word12} and knew they were ready for whatever came next.`,
        placeholders: [
            "adjective", "animal", "object", "tool", "friend", "verb", "place", "animal", "noun", "place", "verb", "emotion"
        ]
    },
    num3: {
        story: `In the land of ${word1}, a ${word2} woke up and immediately went to ${word3}. They grabbed their ${word4} and headed to the ${word5}. There, they met a ${word6} who told them about a ${word7} hidden deep in the ${word8}. But first, they had to ${word9} a ${word10} to find the treasure. It was a journey full of ${word11}, but they finally felt ${word12} when they reached their goal.`,
        placeholders: [
            "place", "adjective", "verb", "tool", "place", "animal", "noun", "place", "verb", "object", "emotion", "emotion"
        ]
    },
    num4: {
        story: `The ${word1} ${word2} went to the ${word3} to visit their old friend, the ${word4}. They spent the day ${word5} by the ${word6} and ${word7}. At night, they sat by the fire and shared stories of their ${word8} adventures. They ate ${word9} and drank ${word10}, feeling completely ${word11}. As they said goodbye, they promised to return whenever they were feeling ${word12}.`,
        placeholders: [
            "adjective", "animal", "place", "person", "verb", "noun", "verb", "adjective", "food", "beverage", "emotion", "emotion"
        ]
    },
    num5: {
        story: `One ${word1} day, a ${word2} decided to ${word3} all across the ${word4}. They crossed rivers, climbed mountains, and even fought off a ${word5} along the way. By the time they reached the ${word6}, they were tired but happy. The ${word7} they found there was more beautiful than they had ever imagined. But when they looked around, they realized they had to ${word8} back home before nightfall. It was a ${word9} adventure, and they felt ${word10} when they finally returned.`,
        placeholders: [
            "adjective", "animal", "verb", "place", "animal", "place", "verb", "emotion", "adjective", "emotion"
        ]
    },
    num6: {
        story: `A ${word1} ${word2} went on a long journey through the ${word3}. They traveled for days, but nothing could prepare them for the ${word4} that awaited them at the ${word5}. Along the way, they met a ${word6} who offered them a ${word7} to help them on their way. But the ${word8} they encountered was no ordinary ${word9} and required them to ${word10}. In the end, they emerged ${word11}, knowing they had achieved something truly ${word12}.`,
        placeholders: [
            "adjective", "animal", "place", "adjective", "place", "animal", "object", "adjective", "animal", "verb", "emotion", "adjective"
        ]
    },
    num7: {
        story: `In a ${word1} forest, a ${word2} wandered alone, searching for ${word3}. As they walked deeper into the ${word4}, they saw a ${word5} who gave them a ${word6}. The ${word7} led them to a hidden ${word8} that no one had ever seen before. But as they explored, they accidentally ${word9} a ${word10} and had to ${word11} to escape. They were ${word12} but proud of their ${word13} journey.`,
        placeholders: [
            "adjective", "animal", "object", "place", "animal", "object", "adjective", "place", "verb", "object", "verb", "emotion", "emotion"
        ]
    },
    num8: {
        story: `The ${word1} ${word2} had always dreamed of going to ${word3}, and finally, the day arrived. They packed their ${word4} and set off on their adventure, encountering a ${word5} and a ${word6} along the way. When they reached ${word7}, they were greeted by a ${word8} who invited them to ${word9}. It was a ${word10} experience, and they felt ${word11} as they watched the ${word12} fade behind the horizon.`,
        placeholders: [
            "adjective", "animal", "place", "tool", "animal", "adjective", "place", "animal", "verb", "adjective", "emotion", "animal"
        ]
    },
    num9: {
        story: `A ${word1} ${word2} ran through the ${word3}, chasing after a ${word4}. It darted across the ${word5}, leaping over ${word6} and ${word7}. The ${word8} appeared out of nowhere, and the chase became even more ${word9}. Finally, the ${word10} was captured, but the ${word11} felt ${word12} from the intense pursuit.`,
        placeholders: [
            "adjective", "animal", "place", "animal", "place", "object", "object", "animal", "emotion", "animal", "emotion", "emotion"
        ]
    },
    num10: {
        story: `At the ${word1} of a mountain, a ${word2} stood and stared at the ${word3}. Their goal was to ${word4} the ${word5} and reach the ${word6} on top. Along the way, they met a ${word7} who helped them ${word8} past obstacles. When they finally reached the ${word9}, they felt ${word10}, and their ${word11} was filled with ${word12}.`,
        placeholders: [
            "adjective", "animal", "place", "verb", "object", "place", "animal", "verb", "place", "emotion", "emotion", "emotion"
        ]
    }
};

// Function to set the selected story and placeholders
function setStory(storyNumber) {
    const storyKey = 'num' + storyNumber;
    const selectedStory = stories[storyKey];
    
    // Update the placeholders dynamically based on the selected story
    const inputs = document.querySelectorAll('#input-fields input');
    
    // Loop over each input field and update the placeholder text
    inputs.forEach((input, index) => {
        input.placeholder = selectedStory.placeholders[index];
    });

    inputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            var word1 = document.getElementById("word1");
            var word2 = document.getElementById("word2");
            var word3 = document.getElementById("word3");
            var word4 = document.getElementById("word4");
            var word5 = document.getElementById("word5");
            var word6 = document.getElementById("word6");
            var word7 = document.getElementById("word7");
            var word8 = document.getElementById("word8");
            var word9 = document.getElementById("word9");
            var word10 = document.getElementById("word10");
            var word11 = document.getElementById("word11");
            var word12 = document.getElementById("word12");
        });
    });

    // Update the button to generate the story (if needed)
    document.querySelector("#generate-story").onclick = function() {
        let filledStory = selectedStory.story;
        
        // Replace placeholders with the user's inputs
        for (let i = 1; i <= 13; i++) { // Updated for 13 placeholders in Story 1
            filledStory = filledStory.replace('${word' + i + '}', document.getElementById('word' + i).value);
        }
        
        // Display the final story
        document.querySelector("#story").innerHTML = filledStory;
    };

    // Clear the previously displayed story (if any)
    document.querySelector("#story").innerHTML = `Please fill in the blanks above and click 'Generate Story' to see the magic!`;
}