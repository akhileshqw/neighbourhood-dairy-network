import React from 'react'
import { Link } from 'react-router-dom'

const Premium = () => {
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <symbol id="check" viewBox="0 0 16 16">
          <title>Check</title>
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
        </symbol>
      </svg>
      <div className="container py-3">
  {" "}
  <header>
    {" "}
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
      {" "}
      <Link
        to="/"
        className="d-flex align-items-center link-body-emphasis text-decoration-none"
      >
      
        {" "}
        <img 
          src="./cow456.jpeg.jpg" 
          width={40} 
          height={40} 
          className="me-2 rounded-circle" 
          alt="Milk on the Way"
        />
        <span className="fs-4">Milk on the Way Premium</span>{" "}
      </Link>{" "}
    </div>{" "}
    <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
      {" "}
      <h1 className="display-4 fw-normal text-body-emphasis">Premium Subscription Plans</h1>{" "}
      <p className="fs-5 text-body-secondary">
        Enjoy the convenience of regular dairy deliveries with our premium subscription plans. 
        Fresh milk and dairy products delivered right to your doorstep with exclusive benefits for members.
      </p>{" "}
      <div className="alert alert-info" role="alert">
        <strong>Special Offer!</strong> Sign up for any annual plan and get one month free. Use code <strong>FRESHSTART</strong> at checkout.
      </div>
    </div>{" "}
  </header>{" "}
  <main>
    {" "}
    <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
      {" "}
      <div className="col">
        {" "}
        <div className="card mb-4 rounded-3 shadow-sm">
          {" "}
          <div className="card-header py-3">
            {" "}
            <h4 className="my-0 fw-normal">Basic</h4>{" "}
          </div>{" "}
          <div className="card-body">
            {" "}
            <h1 className="card-title pricing-card-title">
              ₹499<small className="text-body-secondary fw-light">/mo</small>
            </h1>{" "}
            <ul className="list-unstyled mt-3 mb-4">
              {" "}
              <li>Daily 500ml milk delivery</li>
              <li>Choose from cow or buffalo milk</li>
              <li>Weekly delivery of curd (500g)</li>
              <li>Customer support via email</li>
              <li><span className="text-success">Free delivery on weekends</span></li>
            </ul>{" "}
            <button
              type="button"
              className="w-100 btn btn-lg btn-outline-primary"
            >
              Sign up
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="col">
        {" "}
        <div className="card mb-4 rounded-3 shadow-sm">
          {" "}
          <div className="card-header py-3">
            {" "}
            <h4 className="my-0 fw-normal">Standard</h4>{" "}
          </div>{" "}
          <div className="card-body">
            {" "}
            <h1 className="card-title pricing-card-title">
              ₹899<small className="text-body-secondary fw-light">/mo</small>
            </h1>{" "}
            <ul className="list-unstyled mt-3 mb-4">
              {" "}
              <li>Daily 1L milk delivery</li>
              <li>Choose any milk variety</li>
              <li>Bi-weekly ghee delivery (250g)</li>
              <li>Priority customer support</li>
              <li><span className="text-success">Free delivery all days</span></li>
              <li><span className="text-success">Monthly dairy gift box</span></li>
            </ul>{" "}
            <button type="button" className="w-100 btn btn-lg btn-primary">
              Get started
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="col">
        {" "}
        <div className="card mb-4 rounded-3 shadow-sm border-primary">
          {" "}
          <div className="card-header py-3 text-bg-primary border-primary">
            {" "}
            <h4 className="my-0 fw-normal">Premium</h4>{" "}
          </div>{" "}
          <div className="card-body">
            {" "}
            <h1 className="card-title pricing-card-title">
              ₹1499<small className="text-body-secondary fw-light">/mo</small>
            </h1>{" "}
            <ul className="list-unstyled mt-3 mb-4">
              {" "}
              <li>Daily 2L milk delivery</li>
              <li>All milk varieties included</li>
              <li>Weekly ghee and curd delivery</li>
              <li>24/7 priority support</li>
              <li><span className="text-success">Customizable delivery schedule</span></li>
              <li><span className="text-success">Premium dairy gift box</span></li>
              <li><span className="text-success">Exclusive farm visits</span></li>
            </ul>{" "}
            <button type="button" className="w-100 btn btn-lg btn-primary">
              Contact us
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>{" "}
    <h2 className="display-6 text-center mb-4">Compare plans</h2>{" "}
    <div className="table-responsive">
      {" "}
      <table className="table text-center">
        {" "}
        <thead>
          {" "}
          <tr>
            {" "}
            <th style={{ width: "34%" }} />{" "}
            <th style={{ width: "22%" }}>Basic</th>{" "}
            <th style={{ width: "22%" }}>Standard</th>{" "}
            <th style={{ width: "22%" }}>Premium</th>{" "}
          </tr>{" "}
        </thead>{" "}
        <tbody>
          {" "}
          <tr>
            {" "}
            <th scope="row" className="text-start">
              Daily Milk Delivery
            </th>{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <th scope="row" className="text-start">
              Multiple Milk Varieties
            </th>{" "}
            <td />{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <th scope="row" className="text-start">
              Early Morning Delivery
            </th>{" "}
            <td />{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <th scope="row" className="text-start">
              Organic Milk Options
            </th>{" "}
            <td />{" "}
            <td />{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <th scope="row" className="text-start">
              Flexible Delivery Schedule
            </th>{" "}
            <td />{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
          </tr>{" "}
        </tbody>{" "}
        <tbody>
          {" "}
          <tr>
            {" "}
            <th scope="row" className="text-start">
              Ghee Delivery
            </th>{" "}
            <td />
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <th scope="row" className="text-start">
              Curd Delivery
            </th>{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <th scope="row" className="text-start">
              Free Home Delivery
            </th>{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <th scope="row" className="text-start">
              Priority Delivery Slots
            </th>{" "}
            <td /> <td />{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <th scope="row" className="text-start">
              Exclusive Dairy Products
            </th>{" "}
            <td /> <td />{" "}
            <td>
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Included"
              >
                <use xlinkHref="#check" />
              </svg>
            </td>{" "}
          </tr>{" "}
        </tbody>{" "}
      </table>{" "}
    </div>{" "}
    
    <div className="container my-5">
      <h2 className="display-6 text-center mb-4">What Our Customers Say</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="card-title">Rahul Sharma</h5>
                <div>
                  <span className="text-warning">★★★★★</span>
                </div>
              </div>
              <p className="card-text">"I've been using the Premium subscription for 6 months now. The milk is always fresh, and the delivery is consistently on time. The variety of dairy products available is impressive!"</p>
              <p className="text-muted">Premium Plan Member</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="card-title">Priya Patel</h5>
                <div>
                  <span className="text-warning">★★★★★</span>
                </div>
              </div>
              <p className="card-text">"The Standard plan is perfect for my family of three. We love the weekly ghee delivery, and the customer service is excellent. Highly recommend Milk on the Way!"</p>
              <p className="text-muted">Standard Plan Member</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="card-title">Amit Verma</h5>
                <div>
                  <span className="text-warning">★★★★<span className="text-muted">★</span></span>
                </div>
              </div>
              <p className="card-text">"Started with the Basic plan and it's been great. The milk is fresh and the weekend delivery is convenient. Planning to upgrade to Standard soon for more variety."</p>
              <p className="text-muted">Basic Plan Member</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="container my-5">
      <h2 className="display-6 text-center mb-4">Frequently Asked Questions</h2>
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  How does the milk delivery subscription work?
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Our subscription service delivers fresh dairy products directly to your doorstep according to your chosen plan. Once you sign up, you'll receive daily deliveries of milk and regular deliveries of other dairy products based on your subscription level. You can manage your deliveries, pause service when you're away, and update your preferences through your account dashboard.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  What time will my milk be delivered?
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Standard deliveries typically occur between 5:00 AM and 7:00 AM to ensure you have fresh milk for your morning. Premium and Standard plan members can request specific delivery time slots based on availability in your area. You'll receive notifications when your delivery is on the way and when it has been completed.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Can I change my milk variety or quantity?
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Yes! You can change your milk variety and quantity through your account dashboard. Changes made before 6:00 PM will be effective from the next day's delivery. Standard and Premium plan members enjoy more flexibility with milk varieties and can make changes more frequently without additional charges.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  How do I pause deliveries when I'm on vacation?
                </button>
              </h2>
              <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  You can easily pause your subscription through your account dashboard or by contacting customer support. We recommend pausing deliveries at least 24 hours in advance. Your subscription will automatically resume on the date you specify, and you won't be charged for the paused period.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFive">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                  Where does your milk come from?
                </button>
              </h2>
              <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  All our milk comes from local farms within a 100km radius of our distribution centers. We partner with farmers who follow ethical farming practices and maintain high standards of animal welfare. Our milk is collected fresh daily, pasteurized according to food safety standards, and delivered to you within 24 hours of collection to ensure maximum freshness and nutritional value.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="container my-5 py-5 bg-light rounded-3">
      <div className="row align-items-center">
        <div className="col-md-8 mx-auto text-center">
          <h2 className="display-5 fw-bold">Ready for fresh dairy at your doorstep?</h2>
          <p className="lead mb-4">Join thousands of satisfied customers who enjoy fresh, quality dairy products delivered daily. Sign up today and get your first week at 50% off!</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Sign Up Now</button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  </main>{" "}
  <footer className="pt-4 my-md-5 pt-md-5 border-top">
    {" "}
    <div className="row">
      {" "}
      <div className="col-12 col-md">
        {" "}
        <img
          className="mb-2"
          src="./cow456.jpeg.jpg"
          alt=""
          width={24}
          height={24}
          style={{ borderRadius: '50%' }}
        />{" "}
        <small className="d-block mb-3 text-body-secondary">© 2024 Milk on the Way Limited</small>{" "}
      </div>{" "}
      <div className="col-6 col-md">
        {" "}
        <h5>Products</h5>{" "}
        <ul className="list-unstyled text-small">
          {" "}
          <li className="mb-1">
            <Link className="link-secondary text-decoration-none" to="/milk">
              Milk Varieties
            </Link>
          </li>{" "}
          <li className="mb-1">
            <Link className="link-secondary text-decoration-none" to="/ghee">
              Ghee Products
            </Link>
          </li>{" "}
          <li className="mb-1">
            <Link className="link-secondary text-decoration-none" to="#">
              Curd & Yogurt
            </Link>
          </li>{" "}
          <li className="mb-1">
            <Link className="link-secondary text-decoration-none" to="#">
              Specialty Dairy
            </Link>
          </li>{" "}
        </ul>{" "}
      </div>{" "}
      <div className="col-6 col-md">
        {" "}
        <h5>Resources</h5>{" "}
        <ul className="list-unstyled text-small">
          {" "}
          <li className="mb-1">
            <Link className="link-secondary text-decoration-none" to="#">
              Dairy Nutrition
            </Link>
          </li>{" "}
          <li className="mb-1">
            <Link className="link-secondary text-decoration-none" to="#">
              Recipes
            </Link>
          </li>{" "}
          <li className="mb-1">
            <Link className="link-secondary text-decoration-none" to="#">
              Dairy Farming
            </Link>
          </li>{" "}
          <li className="mb-1">
            <Link className="link-secondary text-decoration-none" to="#">
              FAQs
            </Link>
          </li>{" "}
        </ul>{" "}
      </div>{" "}
      <div className="col-6 col-md">
        {" "}
        <h5>About</h5>{" "}
        <ul className="list-unstyled text-small">
          {" "}
          <li className="mb-1">
            <Link className="link-secondary text-decoration-none" to="/about">
              Our Story
            </Link>
          </li>{" "}
          <li className="mb-1">
            <Link className="link-secondary text-decoration-none" to="#">
              Locations
            </Link>
          </li>{" "}
          <li className="mb-1">
            <Link className="link-secondary text-decoration-none" to="#">
              Privacy
            </Link>
          </li>{" "}
          <li className="mb-1">
            <Link className="link-secondary text-decoration-none" to="#">
              Terms
            </Link>
          </li>{" "}
        </ul>{" "}
      </div>{" "}
    </div>{" "}
  </footer>{" "}
</div>
    </div>
  )
}

export default Premium
