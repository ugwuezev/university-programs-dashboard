
import "./search.css";


const SearchInput = ({onChange, placeholder, value}) => {
  
    return (
      <div>
        
        <input
            className="input_search"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />
        
    </div>
    );
  }
  
  export default SearchInput;