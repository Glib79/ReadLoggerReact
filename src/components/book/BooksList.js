import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';
import Moment from 'react-moment';
import { dateFormat } from '../../config/config';
import Table from 'react-bootstrap/Table';

const DashboardList = ({ resource }) => {
  const data = resource.read();

  return (
    <div>
        {data.data.length > 0 &&
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th><Translate value='booksList.title' /></th>
                    <th><Translate value='booksList.author' /></th>
                    <th><Translate value='booksList.startDate' /></th>
                    <th><Translate value='booksList.endDate' /></th>
                    <th><Translate value='booksList.format' /></th>
                </tr>
            </thead>
            <tbody>
            {data.data.map(row => {
                return <tr key={row.id}>
                    <td>
                        {row.book.title}<br />
                        {row.book.subTitle && 
                            <small className="text-muted">{row.book.subTitle}</small>
                        }
                    </td>
                    <td>
                        {row.book.authors.map(author => {
                          return <div key={author.id}>{author.firstName} {author.lastName}</div>;
                        })}
                    </td>
                    <td>{row.startDate ? <Moment format={dateFormat}>{row.startDate}</Moment> : '-'}</td>
                    <td>{row.startDate ? <Moment format={dateFormat}>{row.endDate}</Moment> : '-'}</td>
                    <td><Translate value={row.format.translationKey} /></td>
                </tr>;
            })}
            </tbody>
        </Table>
        }
        {data.data.length === 0 && <div>
            <Translate value='booksList.noBooks' />
        </div>}
    </div>
  );
};

DashboardList.propTypes = {
  resource: PropTypes.object.isRequired
};

export default DashboardList;
