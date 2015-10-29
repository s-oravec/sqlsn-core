--init sqlsn
@sqlsnrc.sql

spool sqlsn_noop.test.log
--case
prompt
prompt * noop should do nothing

prompt call noop
@&&sqlsn_noop
prompt see? nothing
spool off

exit 0

