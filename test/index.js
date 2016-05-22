import React from 'react'
import {Text} from 'react-native'
import { shallow, mount } from 'enzyme'
import AnimateNumber from '../dist/index.js'
import { expect } from 'chai'
import { jsdom } from 'jsdom'

// simulate DOM environment
let exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

describe('<AnimateNumber/>', () => {

  it('renders <AnimateNumber/> component', () => {
    const wrapper = shallow(<AnimateNumber/>)
    expect(wrapper.length).to.be.equal(1)
  })

  it('check if default props is correct', () => {
    const wrapper = shallow(<AnimateNumber/>)
    let text = wrapper.find(Text).nodes[0]
    expect(wrapper.find(Text).length).to.equal(1)
    expect(text.props.value).to.equal(0)
    expect(text.props.steps).to.equal(45)
    expect(text.props.interval).to.equal(14)
    expect(text.props.timing).to.equal('linear')
  })

  it('animate number with custom props', (done) => {
    let props = {
      value : 120,
      steps : 30,
      interval : 15,
    }
    const wrapper = mount(<AnimateNumber {...props}/>)
    setTimeout(() => {
      expect(wrapper.state().value).to.equal(120)
      done()
    }, props.steps * props.interval*1.5)

  })

  it('does formatter work correctly ?', (done) => {
    let expectVal = Math.random()*1000
    let props = {
      value : expectVal,
      steps : 30,
      interval : 15,
      formatter : (val) => `$ ${val} ^_^`,
      onFinish : (val, displayVal) => {
        expect(displayVal).to.equal(`$ ${expectVal} ^_^`)
        done()
      }
    }
    mount(<AnimateNumber {...props} />)
  })

  it('does countBy prop works correctly ?', (done) => {
    let props = {
      value : Math.random() * 50,
      steps : 30,
      interval : 5,
      countBy : 1,
      onProgress : (prev, val) => {
        expect(val - prev).to.equal(1)
      },
      onFinish : () => {
        done()
      }
    }
    mount(<AnimateNumber {...props} />)
  })

  it('component should DEFINITELY work properly when value is the only prop', (done) => {
    let count = 0;
    for(let i=0; i< 10; i++) {
      let wrapper = mount(<AnimateNumber value={3000}/>)
      setTimeout(() => {
        expect(wrapper.state('value')).to.equal(3000)
        count ++;
        if(count == 10)
          done()
      }, 1000)
    }
  })

})
