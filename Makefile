.PHONY: package

package: version
	make -C rel/pkg package

version:
	echo "$(shell git symbolic-ref HEAD 2> /dev/null | cut -b 12-)-$(shell git log --pretty=format:'%h, %ad UTC' --date=local -1)" > jingles.version
	cp jingles.version dist

