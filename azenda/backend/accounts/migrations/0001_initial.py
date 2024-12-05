
import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('username', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('password', models.CharField(max_length=30)),
                ('sleep_start', models.IntegerField(default=0)),
                ('sleep_end', models.IntegerField(default=16)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_name', models.CharField(max_length=50)),
                ('allows_concurrent_events', models.BooleanField()),
                ('start_time', models.DateTimeField(default=datetime.datetime(1970, 1, 1, 0, 0))),
                ('duration_mins', models.IntegerField(default=0)),
                ('event_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.account')),
            ],
        ),
    ]
