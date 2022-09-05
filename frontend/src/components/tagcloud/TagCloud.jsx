import React from 'react';
import { TagCloud as WordCloud} from 'react-tagcloud';

const TagCloud = () => {

    const data = [
        { value: 'JavaScript', count: 38 },
        { value: 'React', count: 30 },
        { value: 'Nodejs', count: 28 },
        { value: 'Express.js', count: 25 },
        { value: 'HTML5', count: 33 },
        { value: 'MongoDB', count: 18 },
        { value: 'CSS3', count: 20 },
      ]
      
  return (
    <div>
        <WordCloud
            minSize={12}
            maxSize={35}
            tags={data}
            onClick={tag => alert(`'${tag.value}' was selected!`)}
        />
    </div>
  )
}

export default TagCloud