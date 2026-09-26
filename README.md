# CIX-accounting-app
## About the Project 🤔
### The Problem 🤨
In most businesses, you sell a product or service, and the total amount you're paid is your revenue. You subtract the cost of that product or service to get the gross profit, then subtract business expenses—things like advertising, packaging, rent, etc.—to get the net profit.

But for some businesses, like my mom's, it isn't that straightforward.

First, there are a variety of goods for sale, and each good can have different measurements and varying prices. And I really mean it when I say varying prices. It's a walk-in stall in my area's international market, so to compete against other traders, you sometimes have to throw discounts around like you're running a charity.

Then there's the varying cost price. The economic state of Nigeria has made it pretty normal to purchase an item at a significantly higher price just a few weeks after initially buying it.

And the varying measurements are no joke either. Take a single product like melon seeds. You can sell it by the cup, half cup, paint, half paint, quarter paint, quarter bag, half bag, or full bag.

All of this introduces a couple of problems:

 1. It becomes difficult to do basic business analysis when COGS (cost of goods sold) can swing significantly.
    Tracking how much profit margin is safe to use when discounting becomes labor-intensive.
 2. Simply organizing records becomes difficult when a single product can have up to 10 different measurements that need       to be accounted for.
 3. Basically, all of this can be done manually. But it's difficult, takes a lot of time, and makes the process prone to       human error.

And why do 100% of the work when you can split the work between you and your software?

### Why Custom Internal Software? 🙋‍♂️
My solution to this problem is custom internal business software.

I don't know if a tool that fits my earlier description already exists on the internet, but I do have a few reasons for building it myself:

 1. Customizability — I want it to be mine, so I can handle, bend, or break it as I please.

 2. Price — If something like this already exists, it'll probably be more expensive than trying to build it myself.

 3. Learning curve & ease of use — This one is probably self-explanatory. I'm not going to try to teach my mom how to use     complicated software that I probably don't fully understand myself. The solution also has to be very easy to use—not       just easy to understand, but quick to use.

 4. Workflow — This is one of the major perks of custom internal software in a business. Instead of adding another tool to     your workflow that requires additional manual work to integrate with your existing processes, you can build the            software around the workflow you already have. It can integrate directly into the business from the backend.

 5. Portfolio & learning opportunity — I'm a self-taught web developer, so I need to keep learning, and I can't miss an        opportunity to learn—not just how to code, but how a business actually operates. Solving a real problem a business has     might be more valuable than simply learning how to write the code.

I'm also planning to write a full article on why businesses need custom internal software, which I'll be posting soon.

### How It Works 🙋‍♀️
1. Products
Input the products for sale, including the base unit that all other units will be converted back to for calculations.

2. Units
Input the various units used for each product, including their conversion rate to the base unit.

The system handles different units and measurements by always converting each sub-unit back to the base unit using the saved conversion rate.

For example, 1 paint of melon seeds could have a conversion rate of 20 cups if the cup is the base unit.

3. Purchases
Input purchases (stock purchased), including the cost price for that specific purchase and the quantity.

The program automatically converts the quantity to the product's base unit and calculates the unit cost of the purchase by dividing the cost price by the quantity in base units.

Each purchase gets a stock ID to differentiate it from other purchases, since different purchases will probably have different unit costs, and their profits will need to be calculated separately.

In addition to these, a remaining quantity is automatically added based on the quantity purchased. This is crucial for business analysis.

The reason is that my solution to the varying cost price of goods is to treat each purchase as a separate stock and calculate its P&L separately before summing everything together.

4. Sales
Input the sale, including the quantity and selling price.

The quantity is automatically converted to the base unit for calculations.

To calculate the P&L of each stock separately, we need to determine which stock the sale came from. This is done by checking the remaining quantity of each stock.

The store uses FIFO (first in, first out) for sales.

The quantity sold, in base units, is compared against the remaining quantity of the first stock in the list of purchases.

If the sale is less than or equal to the remaining quantity, the sale gets the stock ID of that purchase.

If the sale is greater than the remaining quantity, the sale gets broken up into multiple sale items.

For example, if you sell 5 cups of melon seeds and the first stock in the list—let's call it Stock A—has 3 cups remaining, then 3 of the 5 cups sold came from Stock A. The remaining 2 cups came from the next available stock, Stock B.

The sale is therefore split into two sale items, each associated with its respective stock ID.

5. Analysis
The stock IDs are crucial for this part.

Purchases and sales with the same stock ID are analyzed together to calculate the revenue, unit cost, and gross profit for that stock before everything is summed up for the same product.

I'll still be publishing more technical details on each of these.

This is just a breakdown of how I currently imagine the software working. More details on each step will be posted as I tackle them.

I chose to approach it this way because I want to stay open to ideas and feedback. I really just want to hear what people think about the description and the overall approach before I fixate on a particular method of building it.
