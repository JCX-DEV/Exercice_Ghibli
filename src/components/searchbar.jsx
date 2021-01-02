import { useState, useEffect } from 'react';
import './searchbar.css';


function SearchBar(props) {
	
	const [selection, setSelection] = useState(null);

	let handleKeyDown = (event) => {
		if (displayCompletion()){	
			//enter=13 left=37 up=38 right=39 down=40		
			let index = -1;
			if (selection){
				props.completion.forEach((compl, idx) => {
					if (compl.id === selection){
						index = idx;
					}
				})
			}
			switch(event.keyCode){
				case 13:{
					if (props.selectItem){
						if (props.completion.length > 1){
							if (selection){
								props.selectItem(selection);
							}
						}
						else if (props.completion.length === 1){
							props.selectItem(props.completion[0].id);
						}
					}
					break;
				}
				case 38: {
					setSelection(props.completion[(props.completion.length + index - 1)%props.completion.length].id); 
					break;
				}
				case 40: {
					setSelection(props.completion[(index + 1)%props.completion.length].id); 
					break;
				}
				default: break;
			}
		}
	}

	useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    // clean
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  let displayCompletion = () => {
  	return ((props.value !== '') && props.completion && (props.completion.length > 0));
  }

	return(
		<div className={'search'}>
			<input 
				type='text' 
				className={`search-bar search-bar-${displayCompletion() ? 'with-completion' : 'empty'}`}
				placeholder={props.placeholder} 
				value={props.value} 
				onChange={props.onChange}
			/>
			{ displayCompletion() ?
				<div className={'search-completion'}>
				{props.completion.map(
						suggestion => {							
							let suggest = suggestion.value;
							let idxStart = suggest.toLowerCase().indexOf(props.value.toLowerCase());
							let idxEnd = idxStart + props.value.length;
							return (
								<div 
									className={`search-completion-item ${(selection === suggestion.id ? 'completion-item-selected' : '')}`}
									key={suggestion.id}
									onClick={props.selectItem ? () => props.selectItem(suggestion.id) : null}
							  >									
									<span className={'completion-item-light'}>{suggest.substring(0, idxStart)}</span>
									<span className={'completion-item-target'}>{suggest.substring(idxStart, idxEnd)}</span>
									<span className={'completion-item-light'}>{suggest.substring(idxEnd)}</span>									
								</div>);
						}
					)
				}
				</div>
				: null				
			}
		</div>
	);	
}

export default SearchBar;