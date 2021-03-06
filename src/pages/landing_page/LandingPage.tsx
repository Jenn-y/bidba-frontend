import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Auction } from 'interfaces/Auction'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import AuctionService from 'services/AuctionService'
import CategoryService from 'services/CategoryService'
import GridView from 'shared/product_layout/GridView'
import HighestBid from 'utils/helper_components/HighestBid'

import './LandingPage.scss'

const LandingPage = () => {

	const [newArrivalsActive, setNewArrivalsActive] = useState(true)
	const [lastChanceActive, setLastChanceActive] = useState(false)
	const [auctions, setAuctions] = useState([])
	const [highlightedProduct, setHighlightedProduct] = useState<Auction>()
	const [categories, setCategories] = useState([])

	useEffect(() => {
		getCategories()
		handleNewArrivals()
	}, [])

	const getCategories = () => {
		CategoryService.getLandingPageCategories()
			.then(response => {
				if (response) {
					setCategories(response)
				}
			})
	}

	const handleNewArrivals = () => {
		setNewArrivalsActive(true)
		setLastChanceActive(false)

		AuctionService.getNewArrivals()
			.then(response => {
				if (response) {
					setAuctions(response)
					setHighlightedProduct(response[0])
				}
			})
	}

	const handleLastChance = () => {
		setNewArrivalsActive(false)
		setLastChanceActive(true)

		AuctionService.getLastChance()
			.then(response => {
				if (response) {
					setAuctions(response)
				}
			})
	}

	let defaultImage = [
		'https://sankosf.com/wp-content/themes/gecko/assets/images/placeholder.png'
	]

	return (
		<>
			<div className="heading">
				<div className="container">
					<div className="row highlight">
						<div className="col-12 col-sm-4 col-lg">
							<h6 className="cat-title">CATEGORIES</h6>
							{categories ? 
								<ul className="cat-list">
									{categories.map((category: any) => {
										return (
											<li key={category.id}><div className="category"><Link to={`/shop/${category.id}`}>{category.name}</Link></div></li>
										)
									})} 
									<li><div className="category"><Link to="/shop/all">All Categories</Link></div></li>
								</ul> : '' 
							}
						</div>
						<div className="col-12 col-sm-4 col-lg product-desc">
							{highlightedProduct ?
								<>
									<h4 className="prod-title">{highlightedProduct?.item.name}</h4>
									<h4 className="price">Start from ${<HighestBid id={highlightedProduct.id} />}</h4>
									<p>{highlightedProduct?.item.description}</p>
									<Link to={`/auctions/${highlightedProduct.id}`} className="bid-btn">BID NOW <FontAwesomeIcon icon={faAngleRight} /></Link>
								</> : ''
							}
						</div>
						<div className="col-12 col-sm-4 col-lg">
							<img src={highlightedProduct?.item.imageLink ? highlightedProduct.item.imageLink : defaultImage[0]} alt="sneakers" />
						</div>
					</div>
				</div>
			</div>
			<div className="main">
				<div className="container">
					<div className="row tab-navs">
						<div className="col-12 col-sm-12 col-lg">
							<div className="list">
								<button className={newArrivalsActive ? 'active' : ''}
									onClick={handleNewArrivals} >New Arrivals</button>
								<button className={lastChanceActive ? 'active' : ''}
									onClick={handleLastChance}>Last Chance</button>
							</div>
						</div>
					</div>
				</div>
				<GridView
					auctions={auctions}
					numOfCols={3}
				/>
			</div>
		</>
	)
}

export default LandingPage
