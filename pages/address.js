import React from 'react';
import style from '../styles/style.scss';
import "isomorphic-fetch";
import { initGA, logPageView } from '../utils/analytics';

export default class extends React.Component {

  componentDidMount () {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }

  static async getInitialProps ({ req, query }) {
    const { address } = query
    const res = await fetch(`https://api.gwei.live/address/${address}`)
    const data = await res.json()
    return { address: data }
  }

  render() {
    const { address } = this.props

    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item">
              <img src="/static/gwei.live.png" alt="Gwei.Live: a modern transaction explorer" width="115" />&nbsp;rinkeby
            </a>
          </div>
        </nav>
        <section className="section is-medium">
          <div className="container">
        <div className="columns">
          <div className="column"></div>
          <div className="column is-four-fifths">
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="subtitle is-6">address</p>
                    <p className="title is-4">{address.address}</p>
                  </div>
                </div>

                <div className="content">
                  <table className="table is-striped">
                    <tbody>
                      <tr>
                        <td>Balance</td>
                        <td>{address.balance}</td>
                      </tr>
                      <tr>
                        <td>Transaction Count</td>
                        <td>{address.txCount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="column"></div>
        </div>
      </div>
      </section>
      </div>
    )
  }
}