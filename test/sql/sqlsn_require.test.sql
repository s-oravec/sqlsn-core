--init sqlsn
@sqlsnrc.sql

spool sqlsn_require.test.log
--case
prompt
prompt * case [required module should load]

prompt require module foo
@&&sqlsn_require foo

--assertions
prompt - command foo_bar [&&foo_bar] should be defined
spool off

exit 0

