
import "./search.css";


const SearchInput = ({onChange, placeholder}) => {
  
    return (
      <div>
        
        <input
            className="input_search"
            placeholder={placeholder}
            onChange={onChange}
          />
        
    </div>
    );
  }
  
  export default SearchInput;