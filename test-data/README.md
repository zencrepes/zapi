This folder contains snapshot-tests only useful in the context of a refactor.

It contains common queries, and can be used to compare before/after.

`__snapshots__` are not to be committed, typical use case would be:

1/ Refresh snapshots (consider as a starting point tha the API is correct)
2/ Run jest in watch mode
3/ Refactor code
4/ Ensure nothing breaks
