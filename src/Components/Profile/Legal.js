import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity,Image,TextInput
} from 'react-native';

const terms = [{
	heading:'This is a legal heading for terms',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
},{
	heading:'This is a legal heading for terms',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
},{
	heading:'This is a legal heading for terms',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
},{
	heading:'This is a legal heading for terms',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
},{
	heading:'This is a legal heading for terms',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
},{
	heading:'This is a legal heading for terms',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
},{
	heading:'This is a legal heading for terms',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
},{
	heading:'This is a legal heading for terms',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
},{
	heading:'This is a legal heading for terms',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
}]


const privacy = [{
	heading:'This is a legal heading for privacy',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
},{
	heading:'This is a legal heading for privacy',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
},{
	heading:'This is a legal heading for privacy',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
},{
	heading:'This is a legal heading for privacy',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
},{
	heading:'This is a legal heading for privacy',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
},{
	heading:'This is a legal heading for privacy',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
},{
	heading:'This is a legal heading for privacy',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
},{
	heading:'This is a legal heading for privacy',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
},{
	heading:'This is a legal heading for privacy',
	info: 'Thiasioda asid nasidn aisdn aidn aisdn aisdn aiosnd aiosndioa naiosnd aiosnd aiosnd iaosnd aiosdna indisn aosdnais nasid nasodi nasd'
}]

export const Legal = (props) => (
		<ScrollView>
			<View style={{padding:10,alignItems:'center'}}>
				{ props.form === 'terms' ?
					terms.map((t,i) => 
						<View>
							<Text style={{color:'#a020f0',fontSize:16,textDecorationLine:'underline',marginBottom:10,fontWeight:'bold'}}>{`${i+ 1}. ${t.heading}`}</Text>
							<Text style={{color:'#a020f0',fontSize:12,letterSpacing:1,marginBottom:15}}>{t.info}</Text>
						</View>)
					:
					privacy.map((t,i) => 
						<View>
							<Text style={{color:'#a020f0',fontSize:16,textDecorationLine:'underline',marginBottom:10,fontWeight:'bold'}}>{`${i+ 1}. ${t.heading}`}</Text>
							<Text style={{color:'#a020f0',fontSize:12,letterSpacing:1,marginBottom:15}}>{t.info}</Text>
						</View>)
				}
			</View>
		</ScrollView>

	)
