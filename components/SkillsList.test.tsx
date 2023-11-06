import React from 'react';
import renderer from 'react-test-renderer';
import SkillsList from './SkillsList'; // Adjust the import path as needed

test('SkillsList snapshot', () => {
  const component = renderer.create(<SkillsList />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
