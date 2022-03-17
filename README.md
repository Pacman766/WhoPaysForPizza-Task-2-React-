## Getting Started
npm i

## Task #2 - Who pays for pizza?
The party is about to start and we realized that our mama can't make such a big pizza for such a big crowd of people. So, we decided to order pizza from Dominos! We know how many of our guests will eat pizza, but we totally forgot that there are vegans among them. Also, we need to calculate how much each of the guests should pay and we need to show a table with guests to track who paid for party pizza and who did not. 
When a guest pays his share, we need to recalculate how much money we still need to collect. More details on that later.
P.S. And of course, we still need our pizza slicer, don't throw this feature away.
* If you find this task easy enough, you can also order some drinks for your guests. In this case, the Total table would contain all guests, not only the pizza-eaters. And of course, guests don't pay for pizza if they don't eat it. But, every guest will drink cola and pay for it.
API
All "price" values in responses are per order, not per guest. 
Party guests
https://gp-js-test.herokuapp.com/pizza/guests
Order pizza
https://gp-js-test.herokuapp.com/pizza/order/TYPE/X
Order pizza, get of type (vegan, meat, cheese) suitable for dividing into X numbers of slices
Example:
https://gp-js-test.herokuapp.com/pizza/order/vegan/12 - Order vegan pizza big enough for 12 slices
Currency
https://gp-js-test.herokuapp.com/pizza/currency
Get currency exchange rates (based on BYN currency). Rates are fake, don't rely on them in your budgets.
Order drink
https://gp-js-test.herokuapp.com/pizza/order-cola/12
Order drinks for 12 people
The World Book of Diets
https://gp-js-test.herokuapp.com/pizza/world-diets-book/NAMES
Check your guests if they are vegans. NAMES is URL-encoded guest names separated by a comma.
Example:
https://gp-js-test.herokuapp.com/pizza/world-diets-book/Anton%20Chehov,Vladimir%20Pushkin
Get diets for "Anton Chehov" and "Vladimir Pushkin"
How PizzaPayApp should look and work?
As in the previous task, we start with an empty page, only the "Load" button appears. When clicking on it, the next things should happen:
1.	show "loading" text while all requests are finished and we can show the result ("Total table")
2.	request for party guests
3.	request for party guests diets
4.	when responses for #2 and #3 arrive, send a request for pizza order and currency exchange. Important: pizza ordering and currency requests should be fired in parallel to save time. If more than 51% of guests are vegans, order "vegan" or "cheese" type of pizza (pick it randomly), else order "meat" pizza. The number of slices remains equal to the number of "pizza eaters", we'll cut a slice of meat pizza for vegan as well. 
5.	when #4 is done (pizza was ordered and currency exchange rates are known) show PizzaSlice and Total table
6.	when clicking on the "PAY" button, zero guest's share, add his share to "collected" amount, subtract his share from "Money to collect" amount, disable the button and change the text to "PAID"
7.	If the guest is vegan - draw his name with green color
8.	Remember to round the prices - only 1 digit of the fraction is allowed. 
After the pizza was ordered and prices are converted	After Anton Chehov paid for himself

Name	Share to pay	Pay
Anton Chehov	5.1 BYN	 
Vladimir Pushkin	5.1 BYN	 
Total order	10.2 BYN	
Money to collect	10.2 BYN	
Money collected	0 BYN	
	
Name	Share to pay	Pay
Anton Chehov	0 BYN	 
Vladimir Pushkin	5.1 BYN	 
Total order	10.2 BYN	
Money to collect	5.1 BYN	
Money collected	5.1 BYN	

What to use
1.	This step will give you the ability to try React. No Redux, mobx, or any other state-manager lib! Only plain React, please. You can use any hooks that come with React (useReducer, useContext, useState, etc.)
2.	Do not use any libs for requests (jQuery, Axios, etc.) - only plain JS's fetch or XHR.
3.	Use lodash if needed (or ramda, underscore - any alternative that you find useful for you). 
4.	For table calculations and sending requests - use either React hooks, no Class Components, please. Leave a comment on why you, how do you think, we restricted to use Class Components.
5.	And yes, the previous PizzaSlicerApp should be rewritten with React.
How/where to create PizzaPayApp?
Use your previous codesandbox link - no need to do again all the stylings for PizzaSlice. So, fork it, update the code, save your codesandbox, and submit your codesandbox link to the form - https://forms.gle/rL6z1H29ChUkb6kG9. 
For an example of codesandbox with React, you can fork their default project - https://codesandbox.io/s/new. Remember to set the name of the project and your name:
 
Docs
React
1.	https://reactjs.org/docs/hello-world.html
2.	https://reactjs.org/docs/getting-started.html
3.	https://reactjs.org/tutorial/tutorial.html
4.	https://blog.logrocket.com/a-quick-guide-to-testing-react-hooks-fa584c415407
5.	https://medium.com/@jaryd_34198/seamless-api-requests-with-react-hooks-part-1-7531849d8381
6.	https://egghead.io/lessons/react-introduction-to-reusable-state-and-effects-with-react-hooks
Other
1.	https://lodash.com/
2.	https://ramdajs.com/
3.	https://learn.javascript.ru/promise

