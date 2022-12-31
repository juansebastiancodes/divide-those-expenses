const groupMemebers = [
  {
    name: 'juancito',
    ammount: 200,
  },
  {
    name: 'sadaca',
    ammount: 1000,
  },
  {
    name: 'verdes',
    ammount: 1000,
  }
];

const _calculateTotalWaste = (groupMemebers) => {
  return groupMemebers.reduce(
    (accumulator, current) => current.ammount + accumulator
    , 0 // initial value
  );
}

const _calculateFinalTicket = (groupMemebers, individualWaste) => groupMemebers.map(
  (member) => {
    member.finalBalance = member.ammount - individualWaste;
    delete member.ammount;
    return member;
  }
);

const _calculateFinalDoubts = (finalTicket) => {
  const doubts = [];
  const finalTicketClone = JSON.parse(JSON.stringify(finalTicket));
  const possitiveMembers = finalTicketClone.filter(member => member.finalBalance > 0);
  const negativeMembers = finalTicketClone.filter(member => member.finalBalance < 0);
  for (const negativeMember of negativeMembers) {
    while (
      negativeMember.finalBalance < 0
      && possitiveMembers?.[0]
      && possitiveMembers[0].finalBalance !== 0
      ) {
      const possitiveMember = possitiveMembers?.[0];
      if (possitiveMember.finalBalance > Math.abs(negativeMember.finalBalance)) {
        doubts.push({ from: negativeMember.name, to: possitiveMember.name, ammount: Math.abs(negativeMember.finalBalance) });
        possitiveMember.finalBalance = possitiveMember.finalBalance + negativeMember.finalBalance;
        negativeMember.finalBalance = 0;
        continue;
      }
      doubts.push({ from: negativeMember.name, to: possitiveMember.name, ammount: possitiveMember.finalBalance });
      possitiveMembers.shift();
      negativeMember.finalBalance = negativeMember.finalBalance + possitiveMember.finalBalance;
    }
  }

  return doubts;
}

const main = () => {
  const totalWaste = _calculateTotalWaste(groupMemebers);
  const individualWaste = totalWaste / groupMemebers.length;
  const finalTicket = _calculateFinalTicket([...groupMemebers], individualWaste);
  const finalDoubts = _calculateFinalDoubts([...finalTicket]);

  console.log({ finalTicket });
  console.log({ finalDoubts });
}

main();
