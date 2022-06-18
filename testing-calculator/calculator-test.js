
it('should calculate the monthly rate correctly', function () {
  // ...
  const values = {
    amount: 200000,
    years: 15,
    rate: 6
  };
  expect(calculateMonthlyPayment(values)).toEqual('1687.71');
});


it("should return a result with 2 decimal places", function() {
  // ..
  const values = {
    amount: 100000,
    years: 55,
    rate: 37
  };
  expect(calculateMonthlyPayment(values)).toEqual('3083.33');
});

/// etc
