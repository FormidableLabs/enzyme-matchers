const toHaveValue = require('../toHaveValue');

function Fixture() {
  return (
    <div>
      <input defaultValue="test" />
      <input defaultValue="foo" value="bar" onChange={jest.fn()} />
    </div>
  );
}

describe('toHaveValue', () => {
  [shallow, mount].forEach(builder => {
    describe(builder.name, () => {
      const wrapper = builder(<Fixture />).find('input').first();
      const truthyResults = toHaveValue(wrapper, 'test');
      const falsyResults = toHaveValue(wrapper, 'Turdz');

      it('returns the pass flag properly', () => {
        expect(truthyResults.pass).toBe(true);
        expect(falsyResults.pass).toBe(false);
      });

      it(`returns the message with the proper pass verbage (${builder.name})`, () => {
        expect(truthyResults.message).toMatchSnapshot();
      });

      it(`returns the message with the proper fail verbage (${builder.name})`, () => {
        expect(truthyResults.negatedMessage).toMatchSnapshot();
      });

      it(`provides contextual information for the message (${builder.name})`, () => {
        expect(truthyResults.contextualInformation).toMatchSnapshot();
      });
    });

    it('prioritizes `value` over `defaultValue`', () => {
      const _wrapper = shallow(<Fixture />).find('input').at(1);
      expect(toHaveValue(_wrapper, 'bar').pass).toBe(true);

      expect(toHaveValue(_wrapper, 'foo').pass).toBe(false);
    });
  });
});
