function Navbar({ activeTab, setActiveTab, token, username, onLoginClick, onLogout }) {
  const tabs = ['Projects', 'My Requests', 'Sent Requests'];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
  <div className="logo-dots">
    <span className="dot dot-1"></span>
    <span className="dot dot-2"></span>
    <span className="dot dot-3"></span>
  </div>
  <div>
    <h1>Nexus</h1>
    <p className="navbar-tagline">post · team · build</p>
  </div>
</div>
      <div className="navbar-right">
        {token && (
          <div className="tab-group">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {token ? (
          <>
            <span className="username-badge">{username}</span>
            <button className="btn-outline btn-sm" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button className="btn-primary btn-sm" onClick={onLoginClick}>Login / Signup</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;