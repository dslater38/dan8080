#include <fstream>
#include <string>
#include <iostream>
#include <cstdint>
#include <iomanip>

int main( int argc, char **argv )
{
	if( argc ==2 )
	{
		auto s = std::string (argv[1]);
		auto stream = std::ifstream(s.c_str(), std::ios::binary);
		if( !stream.fail() )
		{
			std::cout << "[" << std::endl << "\t";
			std::cout << std::hex;
			auto first = true;
			for(auto c = stream.get(); stream.good() ; c = stream.get() )
			{
				if( first )
					first = false;
				else
					std::cout << ", ";
					
				std::cout << "0x" << std::setw(2) << std::setfill('0')<< static_cast<std::uint16_t>( static_cast<std::uint8_t>(c));
			}
			std::cout << std::endl << "]" << std::endl;
		}		
	}
	return 0;
}