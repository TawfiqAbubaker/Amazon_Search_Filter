const ratingsDict = {};
document.querySelectorAll('.s-main-slot.s-result-list.s-search-results.sg-row > div[data-asin]').forEach(div => {
    const asin = div.getAttribute('data-asin');
    const ratingsElement = div.querySelector('span.a-size-base');
    if (ratingsElement) {
        const ratings = parseInt(ratingsElement.textContent.replace(/,/g, ''), 10); // Extract and parse the number of ratings
        ratingsDict[asin] = ratings;
    }
});

const sortedKeys = Object.keys(ratingsDict).sort((a, b) => ratingsDict[a] - ratingsDict[b]);

const parentElement = document.querySelector('.s-main-slot.s-result-list.s-search-results.sg-row');

const sortButton = document.createElement('button');
sortButton.textContent = 'Sort by reviews N°';
sortButton.id = 'sortButton';

sortButton.style.padding = '5px 20px';
sortButton.style.backgroundColor = '#4CAF50';
sortButton.style.color = 'white';
sortButton.style.border = 'none';
sortButton.style.borderRadius = '4px';
sortButton.style.boxShadow = '0px 0px 9px 0px rgb(58 119 68 / 97%)';
sortButton.style.cursor = 'pointer';

const sortContainer = document.querySelector('.sg-col-6-of-20.sg-col.s-desktop-sort-container.sg-col-6-of-16.sg-col-6-of-24.sg-col-6-of-12 .sg-col-inner .a-section');
sortContainer.appendChild(sortButton);

sortButton.addEventListener('click', () => {
    if (parentElement) {
        sortedKeys.forEach(asin => {
            const divToMove = document.querySelector(`div[data-asin="${asin}"]`);
            if (divToMove) {
                parentElement.prepend(divToMove);
            } else {
                console.error(`Div with data-asin="${asin}" not found.`);
            }
        });
    } else {
        console.error('Parent element not found.');
    }
});
