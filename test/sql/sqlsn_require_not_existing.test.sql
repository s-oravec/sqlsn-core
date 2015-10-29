--init sqlsn
@sqlsnrc.sql

spool sqlsn_require_not_existing.test.log
--case
prompt
prompt * case [require of nonexistent module should fail]

--assertions
prompt skipped
prompt try to load module bar which does not exist
prompt should exit SQL*Plus with rollback and exitCode 1
@&&sqlsn_require bar
end spool

exit 0
