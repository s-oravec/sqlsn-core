prompt Loading required module from path [&1]
whenever oserror exit rollback
@&&g_sqlsn_path./&1./module.sql "&1"
whenever oserror continue
