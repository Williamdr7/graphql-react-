import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { Col, Collapse, Label, Row } from 'reactstrap';
import styled from 'styled-components';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

export default function Missions() {
  const { loading, error, data } = useQuery(QuestsQuery);
  if (error) {
    return <h1 className='text-danger'>Fetch Error</h1>;
  } else if (loading) {
    return <h1 className='text-primary'>Loading...</h1>;
  } else {
    return (
      <>
        {data.missions.map((mission) => (
          <MissionCollpase mission={mission} />
        ))}
      </>
    );
  }
}

const MissionCollpase = ({ mission }) => {
  const [isOpen, setIsOpen] = useState();
  return (
    <MissionContainer onClick={() => setIsOpen(!isOpen)}>
      <div className='d-flex'>
        <strong className='mx-auto'>{mission.name}</strong>
        {isOpen ? <FaChevronDown /> : <FaChevronRight />}
      </div>
      <Collapse isOpen={isOpen}>
        <CollapseContent className='shadow-3'>
          <Row>
            <Col>
              <Label className='m-0'>Website: </Label>
              <a target='__blank' href={mission.website}>
                <strong className='d-block'>{mission.website}</strong>
              </a>
              <Label className='m-0'>Manufacturers: </Label>
              {mission.manufacturers.map((manufacturer) => (
                <strong className='d-block'>{manufacturer}</strong>
              ))}
            </Col>
            <Col style={{ height: '250px', overflowX: 'auto' }}>
              <Label className='m-0'>Description: </Label>
              <strong className='d-block'>{mission.description}</strong>
            </Col>
          </Row>
        </CollapseContent>
      </Collapse>
    </MissionContainer>
  );
};

const QuestsQuery = gql`
  query {
    missions {
      name
      manufacturers
      twitter
      payloads {
        nationality
        orbit
      }
      website
      description
    }
  }
`;

const MissionContainer = styled.div`
  align-items: center;
  border-radius: 5px;
  margin-top: 15px;
  padding: 15px;
  background-color: #eeeeee;

  :hover {
    cursor: pointer;
  }
`;

const CollapseContent = styled.div`
  border-top: 1px solid black;
  padding: 15px;
  margin-top: 15px;
`;
