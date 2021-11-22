import { faAngleRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

import { Auction } from 'interfaces/Auction'
import AuctionService from 'services/AuctionService'
import AuthService from 'services/AuthService'

import './SingleProduct.scss'

const SingleProduct = (props: any) => {

	const [detailsActive, setDetails] = useState(true)
	const [sellerInfoActive, setSellerInfo] = useState(false)
	const [customerRevActive, setCustomerRev] = useState(false)
	const [loggedUser, setIsLogged] = useState(false)
	const [item, setItem] = useState<Auction>()

	useEffect(() => {
		const user = AuthService.getCurrentUser()
		if (user != null) {
			setIsLogged(true)
		}
		
		AuctionService.getItem(props.match.params.id)
			.then(response => {
				if (response) {
					setItem(response)
				}
			})
	}, [])

	const handleDetails = () => {
		setDetails(true)
		setSellerInfo(false)
		setCustomerRev(false)
	}

	const handleSellerInfo = () => {
		setDetails(false)
		setSellerInfo(true)
		setCustomerRev(false)
	}

	let images = [
		'https://media1.popsugar-assets.com/files/thumbor/CHzF5iQ31LcGCjSPu1xF0wjTypg/0x0:1500x2024/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2021/04/20/773/n/1922564/c9ce4a74607f107ac3b225.06048116_/i/Best-Women-Sneakers.jpg'
	]

	return (
		<div className="container">
			<div className="row product">
				{item ?
					<>
						<div className="col-12 col-sm-4 col-lg">
							<div className="row">
								<div className="col-12 col-sm-12 col-lg">
									<img src={images[0]} alt="person 1" className="main-img" />
								</div>
								<div className="row">
									<div className="col-12 col-sm-3 col-lg">
										<img src={images[0]} alt="person 1" className="secondary-img" />
									</div>
									<div className="col-12 col-sm-3 col-lg">
										<img src={images[0]} alt="person 1" className="secondary-img" />
									</div>
									<div className="col-12 col-sm-3 col-lg">
										<img src={images[0]} alt="person 1" className="secondary-img" />
									</div>
									<div className="col-12 col-sm-3 col-lg">
										<img src={images[0]} alt="person 1" className="secondary-img" />
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-8 col-lg">
							<h1 className="prod-title">{item?.item.name}</h1>
							<h4 className="prod-price">Start from <span>${item.item.startPrice}</span></h4>
							{loggedUser ?
								<div className="bid-section">
									<input type="text" required name="price" placeholder="Enter your bid" />
									<button className="bid-btn">PLACE BID <FontAwesomeIcon icon={faAngleRight} /></button>
								</div> : ''
							}
							<div className="bid-stats">
								<p>Highest bid: <span>$20</span></p>
								<p>No of bids: <span>2</span></p>
								<p>Time left: <span>10 days</span></p>
							</div>
							<div className="watchlist">
								<button>Watchlist <FontAwesomeIcon icon={faHeart} className="heart" /></button>
							</div>
							<div className="details-section">
								<button className={detailsActive ? 'active' : ''}
									onClick={handleDetails} >Details</button>
								<button className={sellerInfoActive ? 'active' : ''}
									onClick={handleSellerInfo}>Seller Information</button>
							</div>
							{detailsActive ?
								<div className="item-details">
									<p>{item.item.description}</p>
								</div> : ''
							}
							{sellerInfoActive ?
								<div className="item-details">
									<p>{item.seller.firstName} {item.seller.lastName}</p>
								</div> : ''
							}
						</div>
					</> : ''
				}
			</div>
			{loggedUser ?
				<div className="row bidders">
					<div className="col-md-12">
						<div className="table-section">
							<table className="table">
								<thead>
									<tr>
										<th>BIDDER</th>
										<th>DATE</th>
										<th>BID</th>
									</tr>
								</thead>
								<tbody>
									<tr className="bidders-list">
										<td colSpan={2} className="title">
											<div className="thumb">
												<img className="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
											</div>
											<div className="bidder-details">
												<div className="bidder-list-title">
													<h5>Brooke Kelly</h5>
												</div>
											</div>
										</td>
										<td colSpan={1} className="bid-date">
											<p className="date">4 March 2021</p>
										</td>
										<td colSpan={1} className="bid-amount">
											<p>$ 120.00</p>
										</td>
									</tr>
									<tr className="bidders-list">
										<td colSpan={2} className="title">
											<div className="thumb">
												<img className="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
											</div>
											<div className="bidder-details">
												<div className="bidder-list-title">
													<h5>Brooke Kelly</h5>
												</div>
											</div>
										</td>
										<td colSpan={1} className="bid-date">
											<p className="date">4 March 2021</p>
										</td>
										<td colSpan={1} className="bid-amount">
											<p>$ 120.00</p>
										</td>
									</tr>
									<tr className="bidders-list">
										<td colSpan={2} className="title">
											<div className="thumb">
												<img className="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
											</div>
											<div className="bidder-details">
												<div className="bidder-list-title">
													<h5>Brooke Kelly</h5>
												</div>
											</div>
										</td>
										<td colSpan={1} className="bid-date">
											<p className="date">4 March 2021</p>
										</td>
										<td colSpan={1} className="bid-amount">
											<p>$ 120.00</p>
										</td>
									</tr>
									<tr className="bidders-list">
										<td colSpan={2} className="title">
											<div className="thumb">
												<img className="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
											</div>
											<div className="bidder-details">
												<div className="bidder-list-title">
													<h5>Brooke Kelly</h5>
												</div>
											</div>
										</td>
										<td colSpan={1} className="bid-date">
											<p className="date">4 March 2021</p>
										</td>
										<td colSpan={1} className="bid-amount">
											<p>$ 120.00</p>
										</td>
									</tr>
									<tr className="bidders-list">
										<td colSpan={2} className="title">
											<div className="thumb">
												<img className="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
											</div>
											<div className="bidder-details">
												<div className="bidder-list-title">
													<h5>Brooke Kelly</h5>
												</div>
											</div>
										</td>
										<td colSpan={1} className="bid-date">
											<p className="date">4 March 2021</p>
										</td>
										<td colSpan={1} className="bid-amount">
											<p>$ 120.00</p>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div> : ''
			}
		</div>
	)
}

export default SingleProduct
