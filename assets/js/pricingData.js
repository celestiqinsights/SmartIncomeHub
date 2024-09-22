const pricingData = {
    days: '30',
    tasks: '15',
    plans: [
        {
            title: "BASIC PLAN",
            monthlyPrice: '750',
            earningsPerTask: '55',
            dailyEarnings: '750',
            monthlyEarnings: '22,500',
        },
        {
            title: "ECHO PLAN",
            monthlyPrice: '1000',
            earningsPerTask: '115',
            dailyEarnings: '1,725',
            monthlyEarnings: '51,750',
        },
        {
            title: "PRO PLAN",
            monthlyPrice: '1,500',
            earningsPerTask: '200',
            dailyEarnings: '3,000',
            monthlyEarnings: '90,000',
        },
        {
            title: "MAX PLAN",
            monthlyPrice: '2,500',
            earningsPerTask: '350',
            dailyEarnings: '5,250',
            monthlyEarnings: '1,57,500',
        },
    ],
};

$(document).ready(function () {
    $('.pricing-card').each(function (index) {
        const plan = pricingData.plans[index];
        const $card = $(this);

        // Set the plan title and monthly price
        $card.find('.plan-title').text(plan.title);
        $card.find('.price-title span').text(plan.monthlyPrice);

        // Update pricing items
        $card.find('.pricing-items span').eq(0).text(pricingData.days); // Days Work
        $card.find('.pricing-items span').eq(1).text(pricingData.tasks); // Tasks Daily
        $card.find('.pricing-items span').eq(2).text(`₹${plan.earningsPerTask}`); // Earn Per Task
        $card.find('.pricing-items span').eq(3).text(`₹${plan.dailyEarnings}`); // Earn Daily
        $card.find('.pricing-items span').eq(4).text(`₹${plan.monthlyEarnings}`); // Earn Monthly
    });
});
