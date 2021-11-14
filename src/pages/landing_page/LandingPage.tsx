import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Auction } from 'interfaces/Auction'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import AuctionService from 'services/AuctionService'
import GridLayout from 'shared/grid_layout/GridLayout'

import './LandingPage.scss'

const LandingPage = () => {

	const [newArrivalsActive, setNewArrivalsActive] = useState(true)
	const [lastChanceActive, setLastChanceActive] = useState(false)
	const [auctions, setAuctions] = useState([])
	const [highlightedProduct, setHighlightedProduct] = useState<Auction>()

	useEffect(() => {
		handleNewArrivals()
	}, [])

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

	let images = [
		'https://media1.popsugar-assets.com/files/thumbor/CHzF5iQ31LcGCjSPu1xF0wjTypg/0x0:1500x2024/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2021/04/20/773/n/1922564/c9ce4a74607f107ac3b225.06048116_/i/Best-Women-Sneakers.jpg'
	]

	return (
		<>
			<div className="heading">
				<div className="container">
					<div className="row highlight">
						<div className="col-12 col-sm-4 col-lg">
							<h6 className="cat-title">CATEGORIES</h6>
							<ul className="cat-list">
								<li><div className="category"><a>Fashion</a></div></li>
								<li><div className="category"><a>Accesories</a></div></li>
								<li><div className="category"><a>Jewelry</a></div></li>
								<li><div className="category"><a>Shoes</a></div></li>
								<li><div className="category"><a>Sportware</a></div></li>
								<li><div className="category"><a>Home</a></div></li>
								<li><div className="category"><a>Electronics</a></div></li>
								<li><div className="category"><a>Mobile</a></div></li>
								<li><div className="category"><a>Computer</a></div></li>
								<li><div className="category"><a>All Categories</a></div></li>
							</ul>
						</div>
						<div className="col-12 col-sm-4 col-lg product-desc">
							{highlightedProduct ?
								<>
									<h4 className="prod-title">{highlightedProduct?.item.name}</h4>
									<h4 className="price">Start from ${highlightedProduct?.item.startPrice}</h4>
									<p>{highlightedProduct?.item.description}</p>
									<Link to={`/auctions/${highlightedProduct.id}`} className="bid-btn">BID NOW <FontAwesomeIcon icon={faAngleRight} /></Link>
								</> : ''
							}
						</div>
						<div className="col-12 col-sm-4 col-lg">
							<img src={images[0]} alt="sneakers" />
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
				<GridLayout auctions={auctions} />
			</div>
		</>
	)
}

export default LandingPage