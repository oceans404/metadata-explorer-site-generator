import { useState } from 'react';
import { Link } from 'react-router-dom';
import { traitsMap } from './aaaDataFromScraper';

const showTraitsList = (
  traitValues,
  currentTrait,
  showAllTraitValues,
  maxShowCount
) => {
  const fullTraitsList = traitValues
    .map((val) => ({ val, count: traitsMap[currentTrait][val].length }))
    .sort(function (a, b) {
      return a.count - b.count;
    })
    .map(({ val, count }) => (
      <li key={`${currentTrait}-${val}-${count}`}>
        <Link to={`/trait/${currentTrait}/${val}`}>{val}</Link>: {count}
      </li>
    ));

  return (
    <ul>
      {showAllTraitValues
        ? fullTraitsList
        : fullTraitsList.slice(0, maxShowCount)}
    </ul>
  );
};

function TraitsPage() {
  const traits = Object.keys(traitsMap);
  const [showAllTraitValues, toggleShowAllTraitValues] = useState(false);
  const [maxShowCount] = useState(10);

  return (
    <div>
      <div className='section-top'>
        <div className='section-title'>
          <h2>NFT by Trait</h2>
        </div>

        <div className='section-settings'>
          <button
            className='button_slide slide_in'
            onClick={() => toggleShowAllTraitValues(!showAllTraitValues)}
          >
            {showAllTraitValues
              ? `Only show top ${maxShowCount} values`
              : 'Show all values'}
          </button>
        </div>
      </div>

      <div className='flex'>
        {traits.map((trait) => {
          const traitValues = Object.keys(traitsMap[trait]);
          return (
            <div className='column-trait' key={trait}>
              <h3>{trait}</h3>
              {showTraitsList(
                traitValues,
                trait,
                showAllTraitValues,
                maxShowCount
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default TraitsPage;
