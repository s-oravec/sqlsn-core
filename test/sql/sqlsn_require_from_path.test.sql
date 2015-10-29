--init sqlsn
@sqlsnrc.sql

spool sqlsn_require_from_path.test.log
--case
undefine foo_bar
prompt
prompt * case [require module from path]
prompt require module sqlsn_modules/foo
@&&sqlsn_require_from_path "sqlsn_modules/foo"

prompt - command foo_bar [&&foo_bar] should be defined
end spool

exit 0
