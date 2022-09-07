import React from 'react';
import { TagCloud as WordCloud} from 'react-tagcloud';

const TagCloud = () => {

    const data = [
        { value: 'Watson', count: 38 },
        { value: 'Artificial Intelligence', count: 30 },
        { value: 'Mainframe', count: 28 },
        { value: 'Lecture', count: 25 },
        { value: 'AI', count: 33 },
        { value: 'Quantum', count: 18 },
        { value: 'Cloud', count: 20 },
        { value: 'Security', count: 30 },
        { value: 'Project', count: 28 },
        { value: 'Data Science', count: 25 },
        { value: 'Design', count: 33 },
        { value: 'z/os', count: 30 },
        { value: 'Analysis', count: 20 },
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