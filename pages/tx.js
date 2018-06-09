import React from 'react';
import style from '../styles/style.scss';
import { initGA, logPageView } from '../utils/analytics';
import { Link } from '../routes'

import "isomorphic-fetch"

export default class extends React.Component {

  componentDidMount () {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }

  static async getInitialProps ({ req, query }) {
    const { txHash } = query
    const res = await fetch(`http://api.gwei.live/tx/${txHash}`)
    const data = await res.json()
    return { transaction: data }
  }

  render() {
    const { transaction } = this.props
    let className = 'tag';
    if (transaction.status === 'success') {
      className += ' is-success';
    } else {
      className += ' is-danger';
    }
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
          <nav className="panel">
            <p className="panel-heading">
              Transaction Information
            </p>
            <div className="panel-block">
            <table className="table is-hoverable is-fullwidth">
              <tbody>
                <tr>
                  <td>
                    TxHash:
                  </td>
                  <td>
                    { transaction.hash }
                  </td>
                </tr>
                <tr>
                  <td>
                    TxReceipt Status:
                  </td>
                  <td>
                    <span className={className}>{ transaction.status }</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    Block Height:
                  </td>
                  <td>
                    { transaction.blockNumber } - <small>{ transaction.blockHeight } block confirmation </small>
                  </td>
                </tr>
                <tr>
                  <td>
                    From:
                  </td>
                  <td>
                    <Link route={'/address/'+transaction.from} >
                      { transaction.from }
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    To:
                  </td>
                  <td>
                    <Link route={'/address/'+transaction.to} >
                      { transaction.to }
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    Value:
                  </td>
                  <td>
                    { transaction.value } ether
                  </td>
                </tr>
                <tr>
                  <td>
                    Gas Limit:
                  </td>
                  <td>
                    { transaction.gas }
                  </td>
                </tr>
                <tr>
                  <td>
                    Gas Used By Txn:
                  </td>
                  <td>
                    { transaction.gasUsed }
                  </td>
                </tr>
                <tr>
                  <td>
                    Gas Price:
                  </td>
                  <td>
                    { transaction.gasPrice } ether
                  </td>
                </tr>
                <tr>
                  <td>
                    Nonce & |Position|:
                  </td>
                  <td>
                    { transaction.nonce } |{transaction.transactionIndex}|
                  </td>
                </tr>
                <tr>
                  <td>
                    Input Data:
                  </td>
                  <td>
                  <div className="control">
                    <textarea className="textarea" type="text" readOnly value={transaction.input}></textarea>
                  </div>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
            </nav>
          </div>
        </section>
      </div>
    )
  }
}
