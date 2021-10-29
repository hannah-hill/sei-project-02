const Footer = () => {
  return (
    <div className='footer'>
      <p>created by:</p>
      <div className='footer-names'>
        <h4 className='hannah-name'>Hannah Hill</h4>

        <h4 className='james-name'>James Rogers</h4>
      </div>
      <div className='footer-socials'>
        <div className='hannah-social'>
          <p>
            <a href='https://github.com/hannah-hill'>
              <i class='fab fa-github'></i> hannah-hill
            </a>
          </p>
          <p>
            <a href='https://www.linkedin.com/in/hannah-hill/'>
              <i class='fab fa-linkedin'></i> /hannah-hill
            </a>
          </p>
        </div>
        <div className='james-social'>
          <p>
            <a href='https://github.com/james92rogers'>
              <i class='fab fa-github'></i> james92rogers
            </a>
          </p>
          <p>
            <a href='https://www.linkedin.com/in/james92rogers/'>
              <i class='fab fa-linkedin'></i> /james92rogers
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
