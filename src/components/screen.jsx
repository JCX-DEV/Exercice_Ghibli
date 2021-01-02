import './screen.css';

function Screen(props) {
	return(
		<div className={'screen'} key={props.id}>
			<div className={'screen-title'}>				
				<span className={'screen-title-block title-block-upper'}>{props.title}</span>
				<span className={'screen-title-block title-block-lower'}>{(props.original ? props.original : 'スタジオジブリ')}</span>
			</div>
			<div className={'screen-description'}>
				<ul className={'screen-table-content'}>
					{props.details ?
						props.details.map(
							detail => (
								detail.value ?
									<li className={'screen-table-row'} key={detail.label}>
										<div className={'screen-table-cell screen-title-column'}>
											<span className={'screen-label'}>{detail.label}</span>
										</div>
										<div className={'screen-table-cell'}>
											<span>{detail.value}</span>
										</div>
									</li>
									: null
							)
						) 
						: null
					}
				</ul>			
			</div>
		</div>
	);
}

export default Screen;