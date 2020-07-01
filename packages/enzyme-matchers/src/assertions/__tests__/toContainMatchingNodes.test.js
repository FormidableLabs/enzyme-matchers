const PropTypes = require('prop-types');
const getNodeName = require('../../utils/name');
const toContainMatchingNodes = require('../toContainMatchingNodes');

function User(props) {
  return (
    <span className={props.className}>
      User <span data-index={`value-${props.index}`}>{props.index}</span>
    </span>
  );
}

User.propTypes = {
  index: PropTypes.number.isRequired,
  className: PropTypes.string,
};

function Fixture() {
  return (
    <div>
      <ul>
        <li>
          <User index={1} className="userOne" />
        </li>
        <li>
          <User index={2} className="userTwo" />
        </li>
      </ul>
    </div>
  );
}

describe('toContainMatchingNodes', () => {
  [shallow, mount].forEach(renderer => {
    describe(`with a ${renderer.name} wrapper`, () => {
      const wrapper = renderer(<Fixture />);
      const firstUserWrapper =
        renderer === shallow
          ? wrapper.find('User').first().shallow()
          : wrapper.find('User');
      const argsToTest = [
        ['1 .userOne', wrapper, 1, '.userOne', renderer === mount],
        [
          '1 [data-index="value-1"]',
          wrapper,
          1,
          '[data-index="value-1"]',
          renderer === mount,
        ],
        ['2 [data-index]', wrapper, 2, '[data-index]', renderer === mount],
        [
          '1 [data-index="value-1"] in User',
          firstUserWrapper,
          1,
          '[data-index="value-1"]',
          true,
        ],
        ['1 .userOne in User', firstUserWrapper, 1, '.userOne', true],
        [
          '2 [data-index] in ul',
          wrapper.find('ul'),
          2,
          '[data-index]',
          renderer === mount,
        ],
        ['1 .userThree', wrapper, 1, '.userThree', false],
        ['1 [data-index]', wrapper, 1, '[data-index]', false],
      ];

      argsToTest.forEach(
        ([description, currentWrapper, count, selector, expectedResult]) => {
          const result = toContainMatchingNodes(
            currentWrapper,
            count,
            selector
          );
          it(`returns ${expectedResult} for "${selector}" in <${getNodeName(
            currentWrapper
          )}>`, () => {
            expect(result.pass).toBe(expectedResult);
          });

          it(`returns the proper verbage for "${description}"`, () => {
            if (expectedResult) {
              expect(result.message).toMatchSnapshot();
            } else {
              expect(result.negatedMessage).toMatchSnapshot();
            }
          });

          it('provides contextual information for the message', () => {
            expect(result.contextualInformation).toMatchSnapshot();
          });
        }
      );
    });
  });
});

describe('toContainMatchingNodes', () => {
  const wrapper = mount(<Fixture />);
  const argsToTest = [
    ['1 .userOne', wrapper, 1, '.userOne', true],
    ['1 [data-index="value-1"]', wrapper, 1, '[data-index="value-1"]', true],
    ['2 [data-index]', wrapper, 2, '[data-index]', true],
    ['2 [data-index] in ul', wrapper.find('ul'), 2, '[data-index]', true],
    [
      '1 [data-index="value-1"] in User',
      wrapper.find('User'),
      1,
      '[data-index="value-1"]',
      true,
    ],
    ['1 .userThree', wrapper, 1, '.userThree', false],
    ['1 [data-index]', wrapper, 1, '[data-index]', false],
    ['3 [data-index] in ul', wrapper.find('ul'), 3, '[data-index]', false],
  ];

  argsToTest.forEach(
    ([description, currentWrapper, count, selector, expectedResult]) => {
      const result = toContainMatchingNodes(currentWrapper, count, selector);
      it(`returns ${expectedResult} for "${description}"`, () => {
        expect(result.pass).toBe(expectedResult);
      });

      it(`returns the proper verbage for "${description}"`, () => {
        if (expectedResult) {
          expect(result.message).toMatchSnapshot();
        } else {
          expect(result.negatedMessage).toMatchSnapshot();
        }
      });

      it('provides contextual information for the message', () => {
        expect(result.contextualInformation).toMatchSnapshot();
      });
    }
  );
});
