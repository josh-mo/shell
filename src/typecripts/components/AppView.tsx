import React from 'react';
import { Row, Col } from '@zendeskgarden/react-grid';

import useClient from 'src/typecripts/hooks/useClient';

const AppView = () => {
  const client = useClient();

  return (
    <Row justifyContent="center">
      <Col>
        <div>
          Hello, World!
        </div>
      </Col>
    </Row>
  );
};

export default AppView;
