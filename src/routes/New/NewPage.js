import 'react-quill/dist/quill.snow.css';
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { stringify } from 'qs';
import { Button, notification, Card } from 'antd';
import ReactQuill from 'react-quill';
import Ellipsis from '../../components/Ellipsis';
import CountDown from '../../components/CountDown';
import ImageWrapper from '../../components/ImageWrapper';

// import styles from './NewPage.less';

@connect(({ test, loading }) => ({
  test,
  loading: loading.models.test,
}))
export default class NewPage extends Component {
  state = {
    value: 'test',
  };

  componentDidMount() {
    this.fetchTest();
  }

  fetchTest = () => {
    this.props.dispatch({
      type: 'test/fetchTest',
    });
  }

  handleChange = (value) => {
    this.setState({
      value,
    });
  };

  prompt = () => {
    notification.open({
      message: 'We got value:',
      description: <span dangerouslySetInnerHTML={{ __html: this.state.value }} />,
    });
  };

  render() {
    const { test: { test }, loading } = this.props;
    console.log('asdfasdf', stringify(test), loading, this.props);
    return (
      <Fragment>
        <ImageWrapper
          src="https://os.alipayobjects.com/rmsportal/mgesTPFxodmIwpi.png"
          desc="示意图"
        />
        <CountDown style={{ fontSize: 20 }} target={new Date().getTime() + 3900000} />
        <Ellipsis length={100} tooltip>{stringify(test)}</Ellipsis>
        <Card title="富文本编辑器">
          <ReactQuill value={this.state.value} onChange={this.handleChange} />
          <Button style={{ marginTop: 16 }} onClick={this.prompt}>Prompt</Button>
        </Card>
      </Fragment>
    );
  }
}
