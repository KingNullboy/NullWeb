// Function to handle setting the selected story and placeholders
function setStory(storyNumber) {
    // Define the stories and their placeholders
    var stories = {
        num1: {
            story: `Once upon a time in a faraway ${'word1'}, there was a ${'word2'} who loved to ${'word3'}. Every ${'word4'}, they would gather with their friends, a ${'word5'} and a ${'word6'}, to ${'word7'} by the ${'word8'}. But one day, the ${'word9'} changed everything, and they found themselves facing a wild ${'word10'}. In the end, they had to ${'word11'} in order to escape the ${'word12'}, but they felt ${'word13'} after their daring adventure.`,
            placeholders: [
                "place", "adjective", "verb", "time of day", "animal", "adjective", "verb", "noun", "emotion", "animal", "verb", "noun", "emotion"
            ]
        },
        num2: {
            story: `In a small ${'word1'}, there was a ${'word2'} who loved to ${'word3'}. Every ${'word4'}, they would ${'word5'} around the ${'word6'} to collect ${'word7'}. One ${'word8'}, they found a mysterious ${'word9'} that led them to a ${'word10'} adventure! With a ${'word11'} heart, they ${'word12'} to the ${'word13'} and lived happily ever after.`,
            placeholders: [
                "place", "adjective", "verb", "time of day", "verb", "location", "noun", "time of year", "noun", "adjective", "verb", "noun", "emotion"
            ]
        },
        num3: {
            story: `It was a ${'word1'} day in the ${'word2'} as ${'word3'} went to the ${'word4'} to meet their ${'word5'}. Along the way, they saw a ${'word6'} who was ${'word7'}. They decided to ${'word8'} together and have a ${'word9'} adventure in the ${'word10'}. By the end of the day, they were both ${'word11'} and promised to ${'word12'} the next day.`,
            placeholders: [
                "adjective", "place", "name", "location", "relative", "animal", "verb", "verb", "adjective", "place", "emotion", "verb"
            ]
        },
        num4: {
            story: `On a ${'word1'} day in the ${'word2'}, ${'word3'} decided to ${'word4'} on an epic journey. With a ${'word5'} ${'word6'} and a ${'word7'} ${'word8'}, they ventured to the ${'word9'} to search for the ${'word10'}. Along the way, they met a ${'word11'} ${'word12'} who helped them overcome a ${'word13'}.`,
            placeholders: [
                "adjective", "place", "name", "verb", "adjective", "animal", "verb", "noun", "adjective", "place", "emotion", "animal", "noun"
            ]
        },
        num5: {
            story: `In a world where ${'word1'} and ${'word2'} lived side by side, a ${'word3'} was searching for a ${'word4'} to ${'word5'} them. But when they encountered a ${'word6'}, they realized they had to ${'word7'} it before it was too late! With ${'word8'} determination, they ${'word9'} through the ${'word10'} and eventually ${'word11'} the ${'word12'}.`,
            placeholders: [
                "adjective", "adjective", "noun", "verb", "adjective", "animal", "verb", "verb", "adjective", "place", "verb", "noun"
            ]
        },
        num6: {
            story: `In the heart of the ${'word1'}, a ${'word2'} was ${'word3'} when they saw a ${'word4'} ${'word5'} approaching. They decided to ${'word6'} and ${'word7'} their ${'word8'} to escape. As they ran, they encountered a ${'word9'} who offered to ${'word10'} them. In the end, they were ${'word11'} and vowed to ${'word12'} every ${'word13'}.`,
            placeholders: [
                "place", "animal", "verb", "adjective", "noun", "verb", "verb", "noun", "animal", "verb", "emotion", "verb", "noun"
            ]
        },
        num7: {
            story: `On a bright ${'word1'} morning, ${'word2'} set out on a ${'word3'} adventure. With their ${'word4'} in hand and a ${'word5'} in their heart, they journeyed through the ${'word6'} forest. Along the way, they discovered a ${'word7'} hidden behind a ${'word8'} rock. As they explored, they met a ${'word9'} who gave them a ${'word10'} gift.`,
            placeholders: [
                "adjective", "name", "adjective", "object", "emotion", "place", "noun", "adjective", "animal", "noun"
            ]
        },
        num8: {
            story: `At the ${'word1'} of the ${'word2'}, a ${'word3'} was ${'word4'} in search of ${'word5'} who had ${'word6'} them. They journeyed through the ${'word7'} mountain and crossed the ${'word8'} river to find the ${'word9'} that held the ${'word10'} they were after. With ${'word11'} and ${'word12'} determination, they succeeded and became a ${'word13'}.`,
            placeholders: [
                "time", "place", "adjective", "verb", "person", "verb", "adjective", "geographical feature", "object", "adjective", "emotion", "verb", "noun"
            ]
        },
        num9: {
            story: `In a ${'word1'} kingdom, a ${'word2'} named ${'word3'} was known for ${'word4'} with ${'word5'} animals. One day, they found a ${'word6'} and decided to ${'word7'} it to the ${'word8'} to help ${'word9'}. On their journey, they came across a ${'word10'} who challenged them to ${'word11'} for ${'word12'}.`,
            placeholders: [
                "adjective", "animal", "name", "verb", "adjective", "noun", "verb", "place", "noun", "animal", "verb", "noun"
            ]
        },
        num10: {
            story: `In a ${'word1'} city, a ${'word2'} was ${'word3'} to ${'word4'} the ${'word5'} that had been lost. With their ${'word6'} and ${'word7'}, they followed the ${'word8'} trail. Along the way, they encountered a ${'word9'} who offered to ${'word10'} them in exchange for ${'word11'}. Together, they ${'word12'} the ${'word13'} and became heroes.`,
            placeholders: [
                "adjective", "animal", "verb", "verb", "noun", "adjective", "noun", "place", "noun", "verb", "noun", "verb", "noun"
            ]
        }
    };

    // Get the selected story's key
    const selectedStoryKey = 'num' + storyNumber;
    const selectedStory = stories[selectedStoryKey];

    // Update the input field placeholders dynamically based on the selected story
    const inputs = document.querySelectorAll('#input-fields input');
    inputs.forEach((input, index) => {
        // Set the placeholder for each input based on the story's placeholders
        input.placeholder = selectedStory.placeholders[index];
    });

    // Add an event listener for generating the story once the user fills out the fields
    document.getElementById('generate-story').onclick = function () {
        let filledStory = selectedStory.story;

        // Replace placeholders with the values entered by the user
        for (let i = 1; i <= 13; i++) {
            filledStory = filledStory.replace('${word' + i + '}', document.getElementById('word' + i).value);
        }

        // Display the final generated story
        document.getElementById('story').textContent = filledStory;
    };

    // Clear the story area initially
    document.getElementById('story').textContent = "Please fill in the blanks above and click 'Generate Story' to see the magic!";
}