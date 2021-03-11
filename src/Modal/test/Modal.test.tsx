import React from 'react';
import { mount, shallow } from 'enzyme';
import Modal from '../Modal';

describe('Modal', () => {
  let wrapper;
  let mock;

  beforeEach(() => {
    mock = jest.fn();
  });

  it('should match snapshot', () => {
    wrapper = shallow(
    <Modal isOpen={false} onClose={mock}>
        Modal content
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });


  it('should stop propagation on div className "content" click', () => {
    wrapper = mount(
      <div onClick={mock}>
        <Modal isOpen onClose={mock}>
          <div className="content"> Modal content</div>
        </Modal>
      </div>
    );
    wrapper
      .find('.content')
      .at(0)
      .simulate('click');
    expect(mock).toHaveBeenCalled();
  });


  it('should render the Footer', () => {
    wrapper = mount(
      <Modal isOpen onClose={mock}>
        <span>This is a span</span>
      </Modal>
    );

    expect(wrapper.find('span').html()).toEqual(
      '<span>This is a span</span>'
    );
  });

  it('should render a funtional component on the Footer', () => {
    wrapper = mount(
      <Modal isOpen onClose={mock}>
        <footer>This is a footer component</footer>
      </Modal>
    );

    expect(wrapper.find('footer').html()).toEqual(
      '<footer>This is a footer component</footer>'
    );
  });

    it('should not render the Footer if is null', () => {
      wrapper = mount(
        <Modal isOpen onClose={mock}>
          <div>This is a footer component</div>
        </Modal>
      );

      expect(wrapper.exists('footer')).toBeFalsy();
    });

    it('should render custom header', () => {
      wrapper = mount(
        <Modal isOpen onClose={mock}>
          <header>this is a custom header</header>
        </Modal>
      );

      expect(wrapper.find('header').html()).toEqual(
        '<header>this is a custom header</header>'
      );
    });
});
