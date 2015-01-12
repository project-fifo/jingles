VERSION=0.6.1
COMPONENT=fifo-jingles

.PHONY: build_info package package_list

package_list:
	echo "@pkgdep nginx>=1.3.13" > packlist
	(cd ../; find LICENSE* -type f | sort) >> packlist
	(cd ../; find config -type f | sort) >> packlist
	(cd ../; find dist -type f | sort) >> packlist

build_info:
	pkg_info -X pkg_install | egrep '^(MACHINE_ARCH|OPSYS|OS_VERSION|PKGTOOLS_VERSION)' >build-info
	echo "CATEGORIES=fifo" >>build-info
	echo "HOMEPAGE=http://project-fifo.net/" >>build-info

clean:
	-rm *.tgz build-info packlist

package: package_list build_info
	pkg_create -i install.sh -k deinstall.sh -D displayfile -B build-info -c comment -d description -f packlist -I /opt/local/$(COMPONENT) -p ../ -U $(COMPONENT)-$(VERSION)$(SUFFIX).tgz
